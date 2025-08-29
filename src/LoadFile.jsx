/* import "./style.css"; */

import { useState } from "react"

function LoadFile() {

    const [selectedFile, setSelectedFile] = useState(null)
    const [uploadStatus, setUploadStatus] = useState("")

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0])
    }

    const handleLoadFile = async (event) => {
        event.preventDefault()

        if (!selectedFile) {
            setUploadStatus("Пожалуйста, выберите файл")
            return
        }

        const data = new FormData()
        data.append("file", selectedFile)

        try {
            const response = await fetch("https://mailer-php.local/php/jsonFileToServer.php", {
                method: "POST",
                body: data,
                header: {
                    "Content-Type": "multipart/form-data",
                }
            })

            const result = await response.json()

            if (response.ok) {
                setUploadStatus("Файл успешно загружен")
            } else {
                setUploadStatus("Ошибка: " + result.message)
            }

        } catch (error) {
            setUploadStatus("Ошибка сети: " + error.message)
        }

    }

    return (
        <form className="mailling" id="jsonFile" onSubmit={handleLoadFile}>

            <h3>Загрузка файла с данными для рассылки</h3>

            <label htmlFor="jsonFileInput">Загрузите файл формата json</label>
            <input type="file" id="jsonFileInput" name="jsonFileInput" accept=".json" onChange={handleFileChange} />

            <button className="btn-send" type="submit" id="btn_jsonFileInput">
                Загрузить
            </button>

            {uploadStatus && <p>{uploadStatus}</p>}

        </form>
    )
}

export default LoadFile;