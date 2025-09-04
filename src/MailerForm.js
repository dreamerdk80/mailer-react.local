import { useState } from "react";

function MailerForm() {

    const [messageToSend, setMessageToSend] = useState({
        theme: "",
        message: ""
    })
    const [sendStatus, setSendStatus] = useState([])

    const handleChange = (event) => {
        setMessageToSend({
            ...messageToSend,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await fetch("https://mailer-php.local/php/phpMailer.php", {
                method: "POST",
                body: JSON.stringify(messageToSend),
                header: {
                    "Content-Type": "application/json",
                }
            })

            const data = await response.json()

            if (Array.isArray(data)) {
                const messages = data.map(item => item.message);
                setSendStatus(messages);
            } else if (data.message) {
                // Если пришел один объект, а не массив
                setSendStatus([data.message]);
            } else {
                console.error("Неизвестный формат ответа:", data);
                setSendStatus(["Ошибка: неизвестный формат ответа"]);
            }
        } catch (error) {
            console.error("Ошибка отправки: ", error)
        }
    }

    return (
        <form className="mailling" id="send" onSubmit={handleSubmit}>

            <h3>Форма отправки рассылки</h3>

            <div className="field">
                <label htmlFor="theme">Тема письма</label>
                <input type="text" id="theme" name="theme" className="theme" onChange={handleChange} />
            </div>

            <textarea name="message" id="message" onChange={handleChange}></textarea>

            <button className="btn-send" type="submit" id="btn_submit">
                Отправить рассылку
            </button>

            <div className="response-mailer">
                {sendStatus.length > 0 ? (
                    sendStatus.map((value, index) => (
                        <p key={index} style={{ color: 'green', margin: '10px 0' }}>
                            ✅ {value}
                        </p>
                    ))
                ) : (
                    <p>Сообщения еще не отправлены</p>
                )}
            </div>

        </form>
    )
}

export default MailerForm;