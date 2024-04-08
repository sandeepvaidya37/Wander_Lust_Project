const Listing = require("../models/listing.js");


module.exports.index = async(req, res)=>{

    const allListing= await Listing.find({});
    res.render("./listings/index.ejs", {allListing});
};
module.exports.renderNewForm = (req, res)=>{
     
      

    res.render("./listings/new.ejs");
};
module.exports.addNewListing = async(req, res, next)=>{
      let url = req.file.path;
      let filename = req.file.filename;
    let {title, description,  price, location, country}=req.body;

const  newListing = new Listing(
  {
      title: title,
      description: description,
      image: {
        filename: filename,
        url: url,
      },
      price: price,
      location: location,
      country: country,
    }
);

newListing.owner = req.user._id;
await newListing.save();


req.flash('success', 'New Listing Created!');

res.redirect("/listing",);
 
  
};

module.exports.updateListing=async(req, res)=>{
     let {id}=req.params;
     let {title, description, price, location, country}=req.body;
     let listing = await Listing.findByIdAndUpdate(id, { 
       title:title,
       description:description,
       price:price,
       location:location,
       country:country
     });

     if(req.file){
      let url = req.file.path;
      let filename= req.file.filename;
      let listing = await Listing.findByIdAndUpdate(id, { 
        title:title,
        description:description,
        image:{
          url:url,
          filename:filename
        },
        price:price,
        location:location,
        country:country
      });
     }
  
  req.flash("success", "Listing Updted!");
  res.redirect(`/listing/${id}`);
  
  };
  module.exports.editListing=async(req, res)=>{

    let {id}=req.params;
    const listing =await Listing.findById(id);
    let orignalImage=listing.image.url;
   orignalImage= orignalImage.replace("/upload", "/upload/h_300,w_250");
    res.render("./listings/edit.ejs", {listing, orignalImage});
 
 
 };
 module.exports.deleteListing=async (req, res, next)=>{
    try{
    let {id}=req.params;
    
      let deletedListing=await Listing.findByIdAndDelete(id);
      req.flash('Delete', 'Listing deleted successfully!');
      res.redirect("/listing");
         
    }catch{
    next(err);
    }
      
    
    };

    module.exports.showListing = async (req, res, next)=>{
      
        let {id}=req.params;
      
        const listing =await Listing.findById(id).populate("reviews").populate("owner");
        if(!listing){
      
          req.flash('error', 'Listing is not exist anymore!');
           res.redirect("/listing");
      
        };
      
        res.render("./listings/show.ejs", {listing});
      
      
      
      };
