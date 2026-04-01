import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schemas/course.schema';

@Injectable()
export class CourseService {

  constructor(@InjectModel(Course.name) private courseModel) { }

  async create(createCourseDto: CreateCourseDto) {
    try {
      await this.courseModel.create(createCourseDto)
      return { message: "Course crated successfully" };
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    const courses = await this.courseModel.find();
    return {
      courses
    };
  }

  async findOne(id: string) {
    const course = await this.courseModel.findOne({ _id: id })
    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const updated = await this.courseModel.findByIdAndUpdate({ _id: id }, updateCourseDto)
    return {
      message: "Course updated successfully"
    };
  }

  async remove(id: string) {
    await this.courseModel.findByIdAndDelete({ _id: id })
    return {
      message: "Course deleted!"
    };
  }
}
