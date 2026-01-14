// makeInterface.js

function makeInterface()
{
    let mainDiv = ce('div');
    mainDiv.id = 'fileButtonContainer';
    mainDiv.style.display = 'flex';
    mainDiv.style.flexDirection = 'column';
    mainDiv.style.gap = '8px';
    ba(mainDiv);

    //-//

    mainDiv.append(makeTitleOfApp());

    //-//

    // hidden file input
    let fileInput = ce('input');
    fileInput.type = 'file';
    fileInput.multiple = true;
    // hide the default input
    fileInput.style.display = 'none';
    fileInput.addEventListener('change', function(theEvent)
    {
        inputSound();

        let fileList = theEvent.target.files;

        if (fileList && fileList.length > 0)
        {
            cl(fileList);

            let fileNames = '';

            // get file names
            for (let i = 0; i < fileList.length; i++)
            {
                fileNames += fileList[i].name + '\n';

                fileNamesArray.push(fileList[i]);
            }

            for (let i = 0; i < fileList.length; i++)
            {
                let file = fileList[i];

                let blobUrl = URL.createObjectURL(file);

                theBlobArray.push(blobUrl);

                // check file type by extension
                let fileName = file.name.toLowerCase();

                if (fileName.endsWith(".js") || fileName.endsWith(".txt") || fileName.endsWith(".json") || fileName.endsWith(".md") || fileName.endsWith(".c") || fileName.endsWith(".cpp") || fileName.endsWith(".py"))
                {
                    // if text based file use read content
                    let reader = new FileReader();
                    reader.onload = function(e)
                    {
                        let text = e.target.result;

                        // create a textarea to display the text
                        let ta = ce('textarea');
                        ta.value = text;
                        ta.style.width = '700px';
                        ta.style.height = '150px';
                        outputContainer.append(ta);
                    };
                    reader.readAsText(file);
                }
                else if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") || fileName.endsWith(".png") || fileName.endsWith(".gif") || fileName.endsWith(".webp"))
                {
                    // if image file create an img element
                    let img = ce('img');
                    img.src = blobUrl;
                    img.style.maxWidth = '700px';
                    img.style.margin = '8px';
                    outputContainer.append(img);
                }
                else
                {
                    cl('unsupported file type: ' + fileName);
                }
            }

            //-//

            // show data in fileNamesTextArea
            ge('fileNamesTextArea').value = fileNames;

            //-//

            // show data in blobNamesTextArea
            ge('blobNamesTextArea').value = theBlobArray;

            //-//

            mainDiv.append(fileInput);
        }
    });

    //-//

    // visible button that triggers the file input
    let fileButton = ce('button');
    fileButton.id = 'fileButton';
    fileButton.innerText = 'Load Files';
    fileButton.onmouseover = function()
    {
        hoverSound();
    }
    fileButton.onclick = function()
    {
        clickSound();

        // trigger hidden input
        fileInput.click();
    };
    mainDiv.append(fileButton);

    //-//

    let textareaContainer = ce('div');
    textareaContainer.style.display = 'flex';
    textareaContainer.style.flexDirection = 'row';
    mainDiv.append(textareaContainer);

    //-//

    // fileNamesTextArea
    let fileNamesTextArea = ce('textarea');
    fileNamesTextArea.id = 'fileNamesTextArea';
    fileNamesTextArea.style.width = 400 + 'px';
    fileNamesTextArea.style.height = 75 + 'px';
    fileNamesTextArea.style.fontSize = '17px';
    textareaContainer.append(fileNamesTextArea);

    //-//

    // blobNamesTextArea
    let blobNamesTextArea = ce('textarea');
    blobNamesTextArea.id = 'blobNamesTextArea';
    blobNamesTextArea.style.width = 400 + 'px';
    blobNamesTextArea.style.height = 75 + 'px';
    blobNamesTextArea.style.fontSize = '17px';
    textareaContainer.append(blobNamesTextArea);

    //-//

        //-//

    let outputContainer = ce('div');
    outputContainer.style.display = 'flex';
    outputContainer.style.flexDirection = 'column';
    outputContainer.style.gap = '10px';
    mainDiv.append(outputContainer);
}

//----//

// Dedicated to God the Father  
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026  
// https://github.com/ChristopherTopalian  
// https://github.com/ChristopherAndrewTopalian  
// https://sites.google.com/view/CollegeOfScripting

