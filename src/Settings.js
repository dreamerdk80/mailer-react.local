import { useState } from "react";
import GetSettings from "./GetSettings";

function Settings({refetch}) {

    const [settings, setSettings] = useState({
        serverSmtp: "",
        serverPort: "",
        name: "",
        email: "",
        emailPass: ""
    })

    const [answer, setAnswer] = useState("")

    const handleChange = (event) => {
        setSettings({
            ...settings,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await fetch("https://mailer-php.local/php/settingsToDB.php", {
                method: "POST",
                header: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(settings)
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Успешно: ", data);
                setAnswer(data);
            } else {
                console.error("Ошибка: ", response.status);
            }
        } catch (error) {
            console.error("Ошибка: ", error);
        }

    }

    return (
        <form className="mailling" id="settings" onSubmit={handleSubmit}>

            <h3>Настройки</h3>

            <div className="field">
                <label htmlFor="serverSmtp">Сервер SMTP</label>
                <input type="text" name="serverSmtp" id="serverSmtp" value={settings.serverSmtp} onChange={handleChange} />
            </div>

            <div className="field">
                <label htmlFor="serverPort">Порт</label>
                <input type="text" name="serverPort" id="serverPort" value={settings.serverPort} onChange={handleChange} />
            </div>

            <div className="field">
                <label htmlFor="name">Имя отправителя / Название организации</label>
                <input type="text" name="name" id="name" value={settings.name} onChange={handleChange} />
            </div>

            <div className="field">
                <label htmlFor="email">E-mail</label>
                <input type="text" name="email" id="email" value={settings.email} onChange={handleChange} />
            </div>

            <div className="field">
                <label htmlFor="emailPass">Пароль</label>
                <input type="password" name="emailPass" id="emailPass" className="emailPass" value={settings.emailPass} onChange={handleChange} />
            </div>

            <input className="btn-send" type="submit" id="btn_submit_settings" value="Сохранить настройки" />

            <div>
                <p>{answer.message}</p>
                <p>{answer.connect}</p>
                <p>{answer.result}</p>

                <GetSettings />
            </div>

        </form>
    )
}

export default Settings;