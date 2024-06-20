
let dataP;
let stream;

const video = document.getElementById('video');
const image = document.getElementById('imageIdCardFront');
const btnExtract = document.getElementById('extractB');
const mainTextResult = document.getElementById('showResIF');
const imageResult = document.getElementById('imgResult');
const preTI = document.getElementById('showResP');
const pWhat = document.getElementById('whatText');
const pExtracted = document.getElementById('extractedText');
const btnReset = document.getElementById('reset');
const btnSave = document.getElementById('saveDB');
const captureButton = document.getElementById('capture');
const fileIcon = document.getElementById('fileIcon');
const webIcon = document.getElementById('this');
const fileUploadText = document.getElementById('fileUploadText');
const webText = document.getElementById('webText');
const pOr = document.getElementById('or');
const fileUploader = document.getElementById("sourceImage");
const labelResultDB = document.getElementById('resultDB');
const lblPleaseWait=document.getElementById('pleaseWaitLabel');
const imgPleaseWait=document.getElementById('pleaseWaitImage');


function functionIdRecognition() {


    document.getElementsByClassName('tablinks1')[0].style.display = 'none';

    //const animatedText = document.getElementsByClassName("animated-text")[0]
    //animatedText.remove();
    const cursor = document.getElementsByClassName("typed-cursor")[0];
    cursor.remove();

    const t2 = document.getElementById('txt2');
    const t3 = document.getElementById('txt3');
    t2.remove();
    t3.remove();

    const backGround = document.getElementsByClassName("insideForm")[0];
    backGround.style.backgroundImage = "url('')";
    const imageImageId = document.createElement('img');


    const p = document.getElementById('toRecog');
    p.style.display = 'block';


    fileIcon.style.display = 'block';


    fileUploadText.style.display = 'block';


    pOr.style.display = 'block';


    webIcon.style.display = 'block';


    webText.style.display = 'block';


}

function testButton(event) {


    fileUploader.click();
}
function changeUploadIdFront(event) {

    image.src = URL.createObjectURL(event.target.files[0]);
    video.style.display = 'none';
    image.style.display = 'block';
    btnExtract.style.display = 'block';
    btnReset.style.top = '390px';
    btnReset.style.left = '480px';
    btnReset.style.width = '250px';
    btnReset.style.display = 'block';
    webIcon.disabled = true;
    fileIcon.disabled = true;
    fileUploadText.disabled = true;
    webText.disabled = true;



}


function webcameFunction() {
    //document.getElementById('fieldsetWebcam').style.display = 'block';
    //document.getElementById('fieldsetExtract').style.display = 'none';
    reset();
    video.style.display = 'block';

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(s => {
            stream = s;
            video.srcObject = stream;
            video.play();
            captureButton.style.display = 'block';
            btnReset.style.top = '510px';
            btnReset.style.left = '1033px';
            btnReset.style.width = '180px';
            btnReset.style.display = 'block';
            webIcon.disabled = true;
            fileIcon.disabled = true;
            fileUploadText.disabled = true;
            webText.disabled = true;

        })
        .catch(err => {
            reset();
            console.error("Error accessing the webcam: " + err);
        });


}
function takephotoFunction(event) {
    btnReset.style.display = 'none';
    video.style.display = 'none';
    captureButton.style.display = 'none';
    image.style.display = 'block';
    const canvas = document.getElementById('canvas');
    //const capturedImage = document.getElementById('imageIdCardFront');
    //const fileInput = document.getElementById('sourceImage');
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataURL = canvas.toDataURL('image/jpeg');
    image.src = imageDataURL;
    canvas.toBlob(blob => {
        // Create a file from the blob
        const file = new File([blob], 'captured-image.jpeg', { type: 'image/jpeg' });

        // Create a DataTransfer to assign the file to the file input element
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileUploader.files = dataTransfer.files;

        // Log the file input files for verification
        //console.log(fileUploader.files);
    }, 'image/jpeg');
    if (stream != null) {
        stream.getTracks().forEach(track => track.stop());
    }
    btnReset.style.top = '390px';
    btnReset.style.left = '480px';
    btnReset.style.width = '250px';
    btnReset.style.display = 'block';
    btnExtract.style.display = 'block';

}






async function extractFunction() {


    btnReset.style.display = 'none';
    btnExtract.style.display = 'none';

    lblPleaseWait.style.display='block';
    imgPleaseWait.style.display='block';
    //document.getElementById('fieldsetWebcam').style.display = 'none';
    //const video = document.createElement('video');

    //document.getElementById('fieldsetExtract').style.display = 'block';
    const formData = new FormData();
    //const fileField = document.getElementById('sourceImage');
    formData.append('image', fileUploader.files[0]);

    const res = await fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData
    });


    lblPleaseWait.style.display='none';
    imgPleaseWait.style.display='none';

    mainTextResult.style.display = 'block';
    preTI.style.display = 'block';
    pWhat.style.display = 'block';
   
    pExtracted.style.display = 'block';


    //document.getElementById('label1').style.display='block';
    imageResult.style.display = 'block';
    imageResult.src = '';
    //document.getElementById('showResI').innerHTML = 'none';
    document.getElementById('showResP').innerHTML = '';
    mainTextResult.innerHTML = '';
    const data = await res.json();

    dataP = data;

    // console.log(data);

    //const pre = document.getElementById('showRes');
    //const preI = document.getElementById('showResI');

    //const preTIF = document.getElementById('showResIF')
    //pre.innerHTML = data.message;

    //console.log(typeof (data.message));
    //console.log(typeof (data.improvedText));
    const arrayData = data.message.split(',');
    //console.log(arrayData);

    let myArray1 = new Array();
    let myArray2 = new Array();

    let myArray3 = new Array();
    let myArray4 = new Array();

    for (i = 0; i < arrayData.length; i++) {
        if (arrayData[i] < 1 || (i == arrayData.length - 1))
            myArray3.push(arrayData[i]);
        else
            myArray4.push(arrayData[i]);

    }


    for (i = 0; i < arrayData.length; i++) {
        if (i % 2 == 0)
            myArray1.push(arrayData[i]);
        else
            myArray2.push(arrayData[i]);
    }

    //console.log(myArray3);
    //console.log(myArray4);

    //console.log(arrayData.length);
    //console.log(myArray3.length);
    //console.log(myArray4.length);



    //pre.innerHTML = arrayData.toString().replace(/['"\[\]]/g, '').replace(/,/g, '\n');

    //let correctionDictPosition = data.improvedText.indexOf("'spell_corrected_text'");

    // Splitting the string into two parts
    // let part1 = data.improvedText.substring(1, correctionDictPosition - 1);
    // let part2 = data.improvedText.substring(correctionDictPosition + 1, data.improvedText.length - 1);
    mainTextResult.innerHTML = arrayData.toString().replace(/['"\[\]]/g, '');
    //preI.innerHTML = part2;
    preTI.innerHTML = "-" + data.inter1;
    const imgResult = document.getElementById('imgResult');
    imgResult.src = 'data:image/jpeg;base64,' + data.image;
    btnSave.style.display = 'block';
    btnReset.style.top = '520px';
    btnReset.style.left = '160px';
    btnReset.style.display = 'block';




}

function reset() {

    if (stream != null) {
        stream.getTracks().forEach(track => track.stop());
    }

    webIcon.disabled = false;
    fileIcon.disabled = false;
    fileUploadText.disabled = false;
    webText.disabled = false;
    video.style.display = 'none';
    image.style.display = 'none';
    btnExtract.style.display = 'none';
    mainTextResult.style.display = 'none';
    imageResult.style.display = 'none';
    preTI.style.display = 'none';
    pWhat.style.display = 'none';
    pExtracted.style.display = 'none';
    btnReset.style.display = 'none';
    btnSave.style.display = 'none';
    captureButton.style.display = 'none';
    fileUploader.value = '';
    labelResultDB.style.display = 'none';
    btnSave.disabled = false;

}

function openWeb() {

    let mediaDevices = navigator.mediaDevices;

    const video = document.createElement('video');

    video.play();

}

async function saveDocContent(event) {
    // const bSave = document.getElementById('saveDB');
    //const contentDoc = document.getElementById('showResIF');
    const t = mainTextResult.innerHTML;
    const res = await fetch('http://127.0.0.1:3000/saveData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ msg: t })
    });

    const config = await res.json();

    //console.log(config.message);

    labelResultDB.style.display = 'block';
    labelResultDB.innerHTML = config.message;
    btnSave.disabled = true;
}

