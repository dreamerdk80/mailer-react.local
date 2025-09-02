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
                <label for="authEmail">E-mail</label>
                <input name="authEmail" id="authEmail" onChange={handleChange} />
            </div>

            <div className="field">
                <label for="authPass">Пароль</label>
                <input name="authPass" id="authPasss" onChange={handleChange} />
            </div>

            <input className="btn-send" type="submit" id="btn_auth" value="Вход" />

        </form>
    )
}

export default Auth;