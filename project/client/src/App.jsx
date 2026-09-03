import { useEffect, useState } from "react";

function App() {
    const [students, setStudents] = useState([]);

    const [studentId, setStudentId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    // Lấy danh sách sinh viên từ API
    useEffect(() => {
        fetch("/api/students")
            .then((response) => response.json())
            .then((data) => setStudents(data))
            .catch((error) => console.error(error));
    }, []);

    // C49: Gửi POST để thêm sinh viên
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newStudent = {
            studentId: studentId,
            name: name,
            email: email
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
                throw new Error(
                    data.error || data.message || "Không thể thêm sinh viên"
                );
            }

            // Thêm sinh viên mới vào danh sách
            setStudents((prevStudents) => [
                ...prevStudents,
                data
            ]);

            // Xóa nội dung form
            setStudentId("");
            setName("");
            setEmail("");

            alert("Thêm sinh viên thành công!");
        } catch (error) {
            console.error(error);
            alert("Lỗi: " + error.message);
        }
    };

    return (
        <div>
            <h1>Danh sách sinh viên</h1>

            <h2>Thêm sinh viên</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>MSSV: </label>
                    <input
                        type="text"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Họ tên: </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Email: </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <br />

                <button type="submit">
                    Thêm sinh viên
                </button>
            </form>

            <h2>Danh sách</h2>

            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>MSSV</th>
                        <th>Họ tên</th>
                        <th>Email</th>
                    </tr>
                </thead>

                <tbody>
                    {students.map((student) => (
                        <tr key={student._id}>
                            <td>{student.studentId}</td>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;