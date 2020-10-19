const Project = require('../Model/ProjectModel');
const fs= require('fs');

exports.getIndex = (req, res) => {
    let projects = null;
    Project.find({ userId: req.user }).then(result => {
        res.status(200).json({
            projects: result
        })
    }).catch(err => {
        console.log(err);
    })

}

exports.postNewProject = (req, res) => {
    const { title, desc } = req.body;
    console.log('from PostNewProject'+req.file);
    if (!req.file) {
        return res.sendStatus(422)
    }
    const newProject = new Project({
        userId: req.user,
        title: title,
        description: desc,
        filePath: req.file.path,
        fileName:req.file.originalname
    });
    newProject.save().then(response => {
        res.sendStatus(201)
    }).catch(err => {
        res.status(500).json({
            ...err
        })
    })

}

exports.getProject=(req,res)=>{
    const projectId= req.params.id;
    Project.findById(projectId).then(response=>{
        res.status(200).json({
           ...response
        })
    }).catch(error=>{
        res.status(400).json({
            ...error
        })
    })
}

exports.getFile=(req,res)=>{
    const id=req.params.id;
    Project.findById(id).then(response=>{
            const filePath=response.filePath;
        const data= fs.createReadStream(filePath);
        res.setHeader('Content-Type', 'application/x-zip-compressed');
        res.setHeader('Content-Disposition', 'attachment;filename="' + response.fileName + '"');
        // res.setHeader('Content-Length', data.length);
        data.pipe(res);
    }).catch(err=>{
        res.sendStatus(400).json({
            ...err
        })
    })
}
