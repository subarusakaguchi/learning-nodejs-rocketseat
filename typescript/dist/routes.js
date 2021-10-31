"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourse = void 0;
var CreateCourseService_1 = __importDefault(require("./CreateCourseService"));
function createCourse(req, res) {
    var newCourse = {
        duration: 20,
        educator: "Diego",
        name: "React.JS"
    };
    var newCourse2 = {
        name: "React.JS"
    };
    CreateCourseService_1.default.execute(newCourse);
    CreateCourseService_1.default.execute(newCourse2);
    return res.send();
}
exports.createCourse = createCourse;
