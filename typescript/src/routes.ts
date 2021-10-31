import { Request, Response } from 'express'
import CreateCourseService from './CreateCourseService'

export function createCourse(req: Request, res: Response) {
  const newCourse = {
    duration: 20,
    educator: "Diego",
    name:"React.JS"
  }

  const newCourse2 = {
    name:"React.JS"
  }

  CreateCourseService.execute(newCourse)

  CreateCourseService.execute(newCourse2)

  return res.send()
}