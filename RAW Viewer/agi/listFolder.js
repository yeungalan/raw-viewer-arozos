var loadedfile = requirelib("filelib");
if (!loadedfile) {
    console.log("Failed to load lib filelib, terminated.");
}

function listNearby(){
    var result = [];
    //Extract the path from the filepath
    var dirpath = path.split("\\").join("/");
    dirpath = dirpath.split("/");
    dirpath.pop();
    dirpath = dirpath.join("/");

    //Get nearby files and filter out the one that is web supported photo format
    var nearbyFiles = filelib.aglob(dirpath + "/*", "user")
    for (var i = 0; i < nearbyFiles.length; i++){
        var fileStopPos = nearbyFiles[i].lastIndexOf("/")+1;
        var filepath = nearbyFiles[i].substring(0, fileStopPos);
        var filename = nearbyFiles[i].substring(fileStopPos, nearbyFiles[i].length);
        console.log(filepath, filename);
        var ext = nearbyFiles[i].split(".").pop();
        ext = ext.toLowerCase();
        // FILE EXISTS + FILE THUMBNAIL DOES NOT EXIST
        if(filelib.fileExists(nearbyFiles[i]) && !filelib.fileExists(filepath + "/.metadata/.cache/" + filename + ".jpg")) {
            if (ext == "cr2" || ext == "arw" || ext == "dng"){
                result.push(nearbyFiles[i]);
            }
        }
    }

    sendJSONResp(JSON.stringify(result))
}


if (typeof(path) == "undefined"){
    sendJSONResp(JSON.stringify({
        "error": "Invalid path given"
    }));
}else{
    listNearby();
}
