import React from 'react'
import {UploadNewFile} from "../Requests";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {Link} from "react-router-dom";
const NewFileUpload = () =>
{
    const buttonHandler = () =>
    {
        let form = document.getElementById("uploadForm");
        let informLabel = document.getElementById("informLabel");
        let sendButton = document.getElementById("sendButton");
        sendButton.setAttribute('disabled', 'disabled');

        informLabel.textContent = "подождите, парсинг занимает около 5 минут";

        UploadNewFile(new FormData(form)).
        then(resp => {
            if(!resp.ok)
                informLabel.innerText = "Произошла ошибка, попробуйте снова";

            sendButton.removeAttribute("disabled");

            return resp;
        }).
        then(x=>x.json()).
        then(resp=>
        {
            let resultText = resp['isSuccess'] ? "Успешно" : "Произошла ошибка";
            if (resp.isSuccess !== true)
                resultText+="\n\rсообщение: "+resp['errorText']+"\n\rstatusCode"+resp['statusCode'];
            informLabel.innerText = resultText;
        });
    }
       return(
           <div>
               <Link to="/index.html">
                   <ArrowBackIcon style={{ fontSize: 40, cursor:"pointer" }} className="back" onClick={() => {}}/>
               </Link>
               <form id="uploadForm" encType="multipart/form-data" >
                   <p>Загрузите файлы</p>
                   <label>Студенты</label>
                   <p><input  type='file' name="students" multiple accept="text/csv"/></p>
                   <label>Специализации</label>
                   <p><input  type='file' name="specializations" multiple accept="text/csv"/></p>
                   <label>Курсы</label>
                   <p><input  type='file' name="courses" multiple accept="text/csv"/></p>
                   <label>Задания</label>
                   <p><input  type='file' name="assignments" multiple accept="text/csv"/></p>
               </form>
               <div><button onClick={buttonHandler} id="sendButton">Загрузить</button></div>
               <div><label id="informLabel"></label></div>
        </div>)

}
export default NewFileUpload;