import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOne(id: string) {
        const user = await this.userModel.findById(id);

        if (!user) {
            throw new NotFoundException(`Utilisateur avec l'id : ${id} non trouvé !`)
        }

        return { user };
    }

    async removeUser(id: string) {
        const { user } = await this.findOne(id);

        await user.remove();
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const doc = await this.userModel.findById(id).exec();
        doc.firstname = updateUserDto.firstname;
        doc.lastname = updateUserDto.lastname;
        return doc.save();
        //a another way to update a document
        //return this.userModel.findByIdAndUpdate({_id: updateUserDto.id}, {$set: {firstname: updateUserDto.firstname, lastname: updateUserDto.lastname}}, {new: true});
    }
}
