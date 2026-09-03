import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [students, setStudents] = useState([]);

    const [studentId, setStudentId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [editingId, setEditingId] = useState(null);

    // Lấy danh sách sinh viên
    const fetchStudents = async () => {
        try {
            const response = await fetch("/api/students");
            const data = await response.json();
            setStudents(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    // Thêm sinh viên
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newStudent = {
            studentId,
            name,
            email
        };

        try {
            const response = await fetch("/api/students", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newStudent)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || data.message);
            }

            setStudents((prev) => [...prev, data]);

            setStudentId("");
            setName("");
            setEmail("");

            alert("Thêm sinh viên thành công!");
        } catch (error) {
            alert("Lỗi: " + error.message);
        }
    };

    // Bắt đầu sửa
    const handleEdit = (student) => {
        setEditingId(student._id);
        setStudentId(student.studentId);
        setName(student.name);
        setEmail(student.email);
    };

    // Cập nhật sinh viên bằng PUT
    const handleUpdate = async (e) => {
        e.preventDefault();

        const updatedStudent = {
            studentId,
            name,
            email
        };

        try {
            const response = await fetch(
                `/api/students/${editingId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(updatedStudent)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || data.message);
            }

            setStudents((prevStudents) =>
                prevStudents.map((student) =>
                    student._id === editingId ? data : student
                )
            );

            setEditingId(null);
            setStudentId("");
            setName("");
            setEmail("");

            alert("Cập nhật sinh viên thành công!");
        } catch (error) {
            alert("Lỗi: " + error.message);
        }
    };

    // Hủy sửa
    const handleCancel = () => {
        setEditingId(null);
        setStudentId("");
        setName("");
        setEmail("");
    };

    // Xóa sinh viên bằng DELETE
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Bạn có chắc muốn xóa sinh viên này không?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const response = await fetch(
                `/api/students/${id}`,
                {
                    method: "DELETE"
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || data.message);
            }

            setStudents((prevStudents) =>
                prevStudents.filter(
                    (student) => student._id !== id
                )
            );

            alert("Xóa sinh viên thành công!");
        } catch (error) {
            alert("Lỗi: " + error.message);
        }
    };

    return (
        <div className="page">
            <div className="container">

                <div className="header">
                    <h1>🎓 Quản Lý Sinh Viên</h1>
                    <p>Hệ thống quản lý sinh viên MERN</p>
                </div>

                <div className="form-card">
                    <h2>
                        {editingId
                            ? "✏️ Cập nhật sinh viên"
                            : "➕ Thêm sinh viên"}
                    </h2>

                    <form
                        onSubmit={
                            editingId
                                ? handleUpdate
                                : handleSubmit
                        }
                    >
                        <div className="form-group">
                            <label>MSSV</label>
                            <input
                                type="text"
                                placeholder="Nhập mã số sinh viên"
                                value={studentId}
                                onChange={(e) =>
                                    setStudentId(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Họ và tên</label>
                            <input
                                type="text"
                                placeholder="Nhập họ và tên"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Nhập email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="form-buttons">
                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                {editingId
                                    ? "💾 Cập nhật"
                                    : "➕ Thêm sinh viên"}
                            </button>

                            {editingId && (
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="btn btn-secondary"
                                >
                                    ❌ Hủy
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                <div className="list-card">
                    <div className="list-header">
                        <h2>📋 Danh sách sinh viên</h2>
                        <span className="student-count">
                            {students.length} sinh viên
                        </span>
                    </div>

                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>MSSV</th>
                                    <th>Họ và tên</th>
                                    <th>Email</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>

                            <tbody>
                                {students.length > 0 ? (
                                    students.map((student, index) => (
                                        <tr key={student._id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <span className="student-id">
                                                    {student.studentId}
                                                </span>
                                            </td>
                                            <td>{student.name}</td>
                                            <td>{student.email}</td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button
                                                        className="btn-edit"
                                                        onClick={() =>
                                                            handleEdit(student)
                                                        }
                                                    >
                                                        ✏️ Sửa
                                                    </button>

                                                    <button
                                                        className="btn-delete"
                                                        onClick={() =>
                                                            handleDelete(
                                                                student._id
                                                            )
                                                        }
                                                    >
                                                        🗑️ Xóa
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="empty"
                                        >
                                            Chưa có sinh viên nào
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default App;