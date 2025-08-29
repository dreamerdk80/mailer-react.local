import { useState, useEffect } from "react";

function GetSettings() {

    const [data, setData] = useState([
        serverSmtp => "",
        serverPort => "",
        name => "",
        email => ""
    ])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const url = "https://mailer-php.local/php/getSettings.php"

    const fetchData = async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await fetch(url)

            if (!response.ok) {
                throw new Error("Ошибка сервера")
            }

            const result = await response.json()

            if (result.success) {
                setData(result.data)
            } else {
                throw new Error(result.message)
            }
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [url])

    const refetch = () => {
        fetchData()
    }

    if (loading) return <div>Загрузка настроек...</div>
    if (error) return <div>Ошибка: {error}</div>

    return (
        <div className="get-settings">
            <p><span>Сервер SMTP: </span>{data.serverSmtp}</p>
            <p><span>Порт: </span>{data.serverPort}</p>
            <p><span>Имя отправителя / Название организации: </span>{data.name}</p>
            <p><span>E-mail: </span>{data.email}</p>
            <button className="btn-send" onClick={refetch}>Обновить</button>
        </div>
    )
}

export default GetSettings;