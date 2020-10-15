var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();
var counter = 0;
var mode = 'notStarted';
var startDate = '2020-10-15 01:05'
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'alex@thepowercentre.ca',
    pass: 'revolutionfortwo'
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/products', function(req,res,next) {
	if (products[counter]) {
		res.send({product:products[counter],mode:mode});
		console.log(mode)
	} else {
		res.send({product:{expiry:'1989-07-07 07:07'},mode:'finished'})
	}
})

router.put('/buynow', function(req,res,next) {
	let name = req.body.name;
	let email = req.body.email;
	let phone = req.body.phone;
	let model = req.body.model;

	var mailOptions = {
  		from: 'alex@thepowercentre.ca',
  		to: 'alex@thepowercentre.ca',
 		subject: 'New Sale On Power Hour',
  		text: 'Name: ' + name + '\nEmail: ' + email + '\nPhone: ' + phone + '\nModel: ' + model
};

	transporter.sendMail(mailOptions, function(error, info){
  		if (error) {
    		console.log(error);
  		} else {
    		console.log('Email sent: ' + info.response);
 		}
});

	console.log(name,email,phone);
})

let startApp = function(){
	let startTimeMil = new Date(startDate).getTime() - (new Date()).getTime();

	setTimeout(function() {
		mode = 'started';
		startSale();
	},startTimeMil)
	console.log(startTimeMil)
}

let startSale = function() {
	counter++;
	let expiry;
	let timeLeft;
	if (products[counter]) {
		expiry = products[counter].expiry
		timeLeft = new Date(expiry).getTime() - (new Date()).getTime();
		console.log(timeLeft)
	}
	let timer = setTimeout(function() {
		if (counter < products.length) {
			startSale();
		} else {
			mode = 'finished';
		}
	},timeLeft)
}

startApp();

module.exports = router;

let products = [{expiry:startDate}];

let hook9 = {
	brand:'Lowrance',
	model:'Hook 9x',
	description:'Fishfinder with Transducer',
	features:['9" Bright LED display','Full chartplotter','Autotuning sonar'],
	bgImage:'../images/desktop-bg-hook9.png',
	expiry:'2020-10-15 01:30',
	learn:'https://www.lowrance.com/lowrance/type/fishfinders-chartplotters/hook2-9-tripleshot-us-inland'
}; products.push(hook9);

let inez928hd = {
	brand:'Alpine',
	model:'INE-Z928HD',
	description:'Navigation Receiver with 8" Screen',
	features:['Bluetooth audio streaming with hands free calling','Built-in navigation','SiriusXM satellite ready'],
	bgImage:'../images/desktop-bg-INEZ928HD.png',
	expiry:'2020-10-15 02:00',
	learn:'https://www.cnet.com/products/alpine-ine-z928hd-navigation-system-display-8-in-dash-unit-double-din'
}; products.push(inez928hd);

let risebt = {
	brand:'House of Marley',
	model:'Rise BT',
	description:'Wireless Bluetooth Headphones',
	features:['Bluetooth with 12 hours playtime','Integrated microphone','Durable stainless steel design'],
	bgImage:'../images/desktop-bg-rise.png',
	expiry:'2020-10-15 03:00',
	learn:'https://www.thehouseofmarley.com/rise-bt-wireless-headphones.html'
}; products.push(risebt);

let haxp50bt = {
	brand:'JVC',
	model:'Rise BT',
	description:'Wireless Bluetooth Headphones',
	features:['Bluetooth with 40 hours of playtime','Quick charge in 10 minutes for 3 hours playtime','Built-in microphone'],
	bgImage:'../images/desktop-bg-haxp50bt.png',
	expiry:'2020-10-15 04:00',
	learn:'https://uk.jvc.com/headphone-features/xx/haxp50bt'
}; products.push(haxp50bt);

let lbs5 = {
	brand:'Livcon',
	model:'LBS5',
	description:'Tabletop Bluetooth Stereo',
	features:['Stylish wooden cabinet','Bluetooth steaming from any device','On board soft touch control functions'],
	bgImage:'../images/desktop-bg-lbs5.png',
	expiry:'2020-10-15 05:00',
	learn:'http://www.davecohifi.com/Assets/DNPR/LBS5.pdf'
}; products.push(lbs5);

let go2 = {
	brand:'JBL',
	model:'GO 2',
	description:'Waterproof Bluetooth Speaker',
	features:['Waterproof design for worry-free listening by the pool or hottub','Up to 5 hours of playtime','Wireless bluetooth streaming'],
	bgImage:'../images/desktop-bg-go2.png',
	expiry:'2020-10-15 06:00',
	learn:'https://ca.jbl.com/JBL+GO+2.html'
}; products.push(go2);

let un58nu6080 = {
	brand:'Samsung',
	model:'UN58NU6080FXZC',
	description:'58" Smart 4K UHD TV',
	features:['4K Resolution','Slim and stylish','Built-in wireless internet capability'],
	bgImage:'../images/desktop-bg-un58nu6080.png',
	expiry:'2020-10-15 07:00',
	learn:'https://www.samsung.com/ca/tvs/uhdtv-nu6080/'
}; products.push(un58nu6080);

let solo5 = {
	brand:'Bose',
	model:'Solo 5',
	description:'TV Sound System with Bose Universal Remote',
	features:['Drastically improves your TVs sound with only one speaker','Bluetooth connectivity is built in so you can stream music wirelessly','Setup is easy, with only one connection to your TV'],
	bgImage:'../images/desktop-bg-solo5.png',
	expiry:'2020-10-15 08:00',
	learn:'https://www.bose.ca/en_ca/products/speakers/home_theater/bose-solo-5-tv-sound-system.html?gclsrc=aw.ds&gclid=Cj0KCQjwoJX8BRCZARIsAEWBFMJkK8vXb0HBInw-LEuzQsgtGUaCD0kKp6NamDxSBLG-i3pTqWFzj9UaAv8tEALw_wcB&gclsrc=aw.ds#v=solo_5_black'
}; products.push(solo5);

let revolve = {
	brand:'Bose',
	model:'Soundlink Revolve',
	description:'Portable Bluetooth Speaker',
	features:['Waterproof and durable','Loud and clear audio quality in a small package','Stylish and portable'],
	bgImage:'../images/desktop-bg-revolve.png',
	expiry:'2020-10-15 09:00',
	learn:'https://www.bose.ca/en_ca/products/speakers/portable_speakers/soundlink_revolve.html?gclsrc=aw.ds&gclid=Cj0KCQjwoJX8BRCZARIsAEWBFMJ6IjuDVQKu7n4SUB-_S0DOfdiQIFrti7ueaX8wu7__HhzFBiAEVA0aAu9PEALw_wcB&gclsrc=aw.ds#v=soundlink_revolve_triple_black'
}; products.push(revolve);

let kishi = {
	brand:'Razer',
	model:'Kishi for iPhone',
	description:'Universal Gaming Controller for iOS',
	features:['Familiar console controller experience on your mobile device','Ultra Low Latency','Ergonomic Design'],
	bgImage:'../images/desktop-bg-kishi.png',
	expiry:'2020-10-15 10:00',
	learn:'https://www.razer.com/ca-en/mobile-controllers/Razer-Kishi/RZ06-03360100-R3U1?gclid=Cj0KCQjwoJX8BRCZARIsAEWBFMKOWUPAg1U6T1QG5DnKeV6iqye0DLgVfUpn3IVRmADY2sSBdtZgkz4aAuAQEALw_wcB'
}; products.push(kishi);

let boseBundle = {
	brand:'Bose',
	model:'Soundlink Color and Alto Frames',
	description:'Powerful Potable Speaker and Audio Sunglasses',
	features:['Two cool bose products for the price of one','Glasses are stylish with amazing audio quality','Portable speaker is waterproof'],
	bgImage:'../images/desktop-bg-bosebundle.png',
	expiry:'2020-10-15 11:00',
	learn:'https://www.bose.ca/en_ca/products/frames/bose-frames-alto.html'
}; products.push(boseBundle);