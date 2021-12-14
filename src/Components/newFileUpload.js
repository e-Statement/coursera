import React from 'react'
import {UploadNewFile} from "../Requests";
const NewFileUpload = () =>
{
    const buttonHandler = () =>
    {
        let form = document.getElementById("uploadForm");
        let informLabel = document.getElementById("informLabel");

        informLabel.textContent = "подождите, парсинг занимает около 5 минут";

        UploadNewFile(new FormData(form)).
        then(x=>x.json()).
        then(resp=>
        {
            let resultText = "успешно: "+resp['isSuccess'];
            if (resp.isSuccess !== true)
                resultText+="сообщение: "+resp['errorText']+"\n\rstatusCode"+resp['statusCode'];
            informLabel.textContent = resultText;
        });
    }
       return(
           <div>
               <form id="uploadForm" encType="multipart/form-data" >
                   <p>Загрузите файлы</p>
                   <label>студенты</label>
                   <p><input  type='file' name="students" multiple accept="text/csv"/></p>
                   <label>специализации</label>
                   <p><input  type='file' name="specializations" multiple accept="text/csv"/></p>
                   <label>курсы</label>
                   <p><input  type='file' name="courses" multiple accept="text/csv"/></p>
                   <label>assignments</label>
                   <p><input  type='file' name="assignments" multiple accept="text/csv"/></p>
               </form>
               <button onClick={buttonHandler}>Send</button>
               <label id="informLabel"></label>
        </div>)

}
export default NewFileUpload;