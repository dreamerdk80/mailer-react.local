import { useState } from "react";

function Auth() {

    const [auth, setAuth] = useState({
        authEmail: "",
        authPass: ""
    })

    function handleChange(event) {
        setAuth({
            ...auth,
            [event.target.name]: event.target.value
        })
    }

    const handleAuth = async (event) => {
        event.preventDefault()

        try {
            const response = await fetch("https://mailer-php.local/php/auth.php", {
                method: "POST",
                header: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(auth)
            })

            const result = await response.json()

            if (response.ok) {
                console.log(result.message)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form className="mailling" id="auth" onSubmit={handleAuth}>

            <h3>Авторизация</h3>

            <div className="field">
                <label for="auth-email">E-mail</label>
                <input name="auth-email" id="auth-email" onChange={handleChange} />
            </div>

            <div className="field">
                <label for="auth-pass">Пароль</label>
                <input name="auth-pass" id="auth-pass" onChange={handleChange} />
            </div>

            <input className="btn-send" type="submit" id="btn_auth" value="Вход" />

        </form>
    )
}

export default Auth;