import { Injectable, NotFoundException } from '@nestjs/common';
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
    const course = await this.courseModel.findOne({ _id: id }).exec();
    if (!course) throw new NotFoundException()
    console.log(course)
    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const updated = await this.courseModel.findByIdAndUpdate({ _id: id }, updateCourseDto)
    if (!updated) throw new NotFoundException()
    return {
      message: "Course updated successfully"
    };
  }

  async remove(id: string) {

    const course = await this.courseModel.findByIdAndDelete({ _id: id });
    if (!course) throw new NotFoundException();
    return {
      message: "Course deleted!"
    };
  }
}
