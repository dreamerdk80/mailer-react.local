import { useState } from "react";

function Registration() {

    const [regUser, setRegUser] = useState({
        firstName: "",
        lastName: "",
        regEmail: "",
        regPass: "",
        role: ""
    })
    const [regResp, setRegResp] = useState("")

    const handleChange = (event) => {
        setRegUser({
            ...regUser,
            [event.target.name]: event.target.value
        })
    }

    const handleReg = async (event) => {
        event.preventDefault()

        try {
            const response = await fetch("https://mailer-php.local/php/regUser.php", {
                method: "POST",
                header: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(regUser)
            })

            const result = await response.json()

            if (response.ok) {
                console.log(result)
                setRegResp(result)
            } else {
                console.log(result)
                setRegResp(result)
            }
        } catch (error) {
            console.error("Ошибка:", error)
            setRegResp(error)
        }
    }

    return (
        <form className="mailling" id="auth" onSubmit={handleReg}>

            <h3>Регистрация</h3>

            <div className="field">
                <label htmlFor="firstName">Имя</label>
                <input type="text" name="firstName" id="firstName" onChange={handleChange} />
            </div>

            <div className="field">
                <label htmlFor="lastName">Фамилия</label>
                <input type="text" name="lastName" id="lastName" onChange={handleChange} />
            </div>

            <div className="field">
                <label htmlFor="regEmail">E-mail</label>
                <input type="email" name="regEmail" id="regEmail" onChange={handleChange} />
            </div>

            <div className="field">
                <label htmlFor="regPass">Пароль</label>
                <input type="password" name="regPass" id="regPass" onChange={handleChange} />
            </div>

            <div className="field">
                <label htmlFor="role">Роль</label>
                <select name="role" id="role" onChange={handleChange}>
                    <option value="user">Пользователь</option>
                    <option value="admin">Администратор</option>
                </select>
            </div>

            <button className="btn-send" type="submit" id="btn-reg">
                Зарегистрироваться
            </button>

            <p>{regResp}</p>

        </form>
    )
}

export default Registration;