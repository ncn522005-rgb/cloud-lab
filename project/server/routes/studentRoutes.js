const express = require("express");
const router = express.Router();

const Student = require("../models/Student");

//lấy tất cả sinh viên
router.get("/", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message
        });
    }
});

//thêm sinh viên
router.post("/", async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({
            message: "Không thể thêm sinh viên",
            error: error.message
        });
    }
});

//cập nhật sinh viên
router.put("/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!student) {
            return res.status(404).json({
                message: "Không tìm thấy sinh viên"
            });
        }

        res.json(student);
    } catch (error) {
        res.status(400).json({
            message: "Không thể cập nhật",
            error: error.message
        });
    }
});

//xóa sinh viên
router.delete("/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Không tìm thấy sinh viên"
            });
        }

        res.json({
            message: "Xóa sinh viên thành công"
        });
    } catch (error) {
        res.status(400).json({
            message: "Không thể xóa",
            error: error.message
        });
    }
});

module.exports = router;