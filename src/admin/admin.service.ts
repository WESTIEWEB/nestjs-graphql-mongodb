import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdminInput } from './dto/create-admin.input';
import { UpdateAdminInput } from './dto/update-admin.input';
import { Admin } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
  ) {}
  async create(createAdminInput: CreateAdminInput) {
    // const admin = this.findByEmail(createAdminInput.email);

    // if (!admin) {
    const newAdmin = this.adminRepository.create(createAdminInput);

    return this.adminRepository.save(newAdmin);
    // } else throw new BadRequestException('Admin already exists');
  }

  async findAll(): Promise<Admin[]> {
    return this.adminRepository.find();
  }

  async findOne(id: string): Promise<Admin> {
    return this.adminRepository.findOne({
      where: {
        id,
      },
      select: ['id', 'firstName', 'lastName', 'role', 'email', 'phone'],
    });
  }

  async update(id: string, updateAdminInput: UpdateAdminInput): Promise<Admin> {
    const admin = await this.adminRepository.findOne({ where: { id } });
    if (!admin) {
      throw new BadRequestException('Admin not found');
    }
    const updatedAdmin = Object.assign(admin, updateAdminInput);
    return this.adminRepository.save(updatedAdmin);
  }

  remove(id: string) {
    return this.adminRepository.delete(id);
  }

  findByEmail(email: string): Promise<Admin> {
    return this.adminRepository.findOne({
      where: {
        email,
      },
    });
  }
}
