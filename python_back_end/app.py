from flask import Flask,jsonify,request,send_file
import easyocr
from PIL import Image, ImageDraw
import io
import json
from flask_cors import CORS
import numpy as np
from numpy import asarray
import base64
import requests
from transformers import BlipProcessor, BlipForConditionalGeneration

processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-large")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-large")
#from spello.model import SpellCorrectionModel
#sp = SpellCorrectionModel(language='en')
#sp.load('en_large.pkl')

# Create the Flask application
app = Flask(__name__)
CORS(app)

def myFunc1(fileImage):

    #raw_image = Image.open('1.jpeg')
    text = ""
    inputs = processor(fileImage, text, return_tensors="pt")
    out = model.generate(**inputs)
    textPre1=processor.decode(out[0], skip_special_tokens=True)
    # unconditional image captioning
    #inputs = processor(fileImage, return_tensors="pt")
    #out = model.generate(**inputs)
    #textPre2=processor.decode(out[0], skip_special_tokens=True)
    return textPre1


def myFunc(fileImage):

    reader = easyocr.Reader(['de','en'])  # Specify language
    aCoordinates=[]
    data=[]
    print('---------------')

    #img_byte_arr = io.BytesIO()
   
    #image_file.save(img_byte_arr,'JPEG')
    #img_byte_arr.seek(0)
    #print(type(img_byte_arr))
    #img_bytes = img_byte_arr.read()
    #print(type(img_bytes))


    result = reader.readtext(asarray(fileImage))
    for t in result:
        aCoordinates.append(t[0])

    for t in result:
        data.append(t[1])
        #data.append(t[2])

            
    z= [list(map(tuple, rect)) for rect in aCoordinates]


    #img=Image.open(image_file)
    draw = ImageDraw.Draw(fileImage)    
    for fc in z:
        draw.polygon(fc, outline="red",width=4)


    fileImage=fileImage.convert('RGB')

    fileImage.save('result.jpg')
        
    return data,fileImage

@app.route('/')
def index():

    return 'Home page'

@app.route('/upload', methods=['POST'])
def upload_image():

    # Get the uploaded image file
    image_file = request.files['image']
    #image_file='3.jpg'
        # Initialize the reader


        # Open the image file for processing
    image = Image.open(image_file)

        #image.save('example.jpg')
        # Example processing: Convert image to grayscale
    textResult,processed_image = myFunc(image)
    inter1=myFunc1(image)

    image_path = 'result.jpg'
    with open(image_path, 'rb') as image_file_result:
        encoded_image = base64.b64encode(image_file_result.read()).decode('utf-8')
        
        # Save the processed image to a bytes buffer
        #img_io = io.BytesIO()
        #processed_image.save(img_io, 'JPEG')
        #img_io.seek(0)

        #print(type(textResult))

        #t=' '.join(map(str,textResult))
    inter1=str(inter1)
    textResult=str(textResult)
    #improvedText=str(sp.spell_correct(textResult))
    
    response_data = {
        'message': textResult,
        #'improvedText':improvedText,
        'inter1':inter1,
        'image': encoded_image
    }
        

       # json_data=json.dumps(t)

        # Create example JSON data
        #json_data = {
            #'message': 'Image processed successfully',
            #'image_dimensions': processed_image.size
        #}

        # Combine image and JSON data in response
        #response = send_file(img_io, mimetype='image/jpeg')
        #response.headers['Content-Type'] = 'multipart/mixed'
        #response.headers['Json-Data'] = json.dumps(json_data)
    #print(type(textResult))

    #if isinstance(textResult, (np.integer, np.floating)):
        #textResult=textResult.item()
    #if isinstance(textResult, (np.ndarray,)):
        #textResult=textResult.tolist()

 
    #textResult=str(textResult)
    #finalResult=json.dumps(textResult)


    
    return jsonify(response_data)
    

# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True)
