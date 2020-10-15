let products = [];

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mode: "loading",
			currentProduct : {}
		}
		this.getCurrentProduct = this.getCurrentProduct.bind(this);
		this.changeBackground = this.changeBackground.bind(this);
		this.nextProduct = this.nextProduct.bind(this);
		this.startClock = this.startClock.bind(this);
		this.renderStarted = this.renderStarted.bind(this);
		this.renderBuyNow = this.renderBuyNow.bind(this);
		this.buyNow = this.buyNow.bind(this);
		this.completePurchase = this.completePurchase.bind(this);
		this.renderCompletePuchase = this.renderCompletePuchase.bind(this);
		this.learnMore = this.learnMore.bind(this);
		
	}
	getCurrentProduct() {
		return this.state.currentProduct;
	}
	componentDidMount() {
		let that = this

		//Get Current Product ID

		//Get List Of Products
		$.ajax({
		    url: "/products",
		    type: "GET",
		    dataType: "JSON",
		        success: function(response, status, http) {
		            if (response) {
		            	that.setState({currentProduct:response.product,mode:response.mode})
		            	console.log('test')
		            }
		}});
	}
	componentDidUpdate() {
		this.startClock(this.state.currentProduct.expiry);
	}
	nextProduct() {
		location.reload();
	}
	startClock(targetTime) {
	let next = this.nextProduct;
	let that = this;

	  var clock;

	  // Grab the current date
	  var currentDate = new Date();

	  // Target future date/24 hour time/Timezone
	  var targetDate = moment.tz(targetTime, "America/Toronto");

	  // Calculate the difference in seconds between the future and current date
	  var diff = targetDate / 1000 - currentDate.getTime() / 1000;

	  if (diff <= 0) {
	    // If remaining countdown is 0
	    clock = $(".clock").FlipClock(0, {
	      clockFace: "DailyCounter",
	      countdown: true,
	      autostart: false
	    });
	    console.log("Date has already passed!")
	    next();
	    console.log('fixed')
	    
	  } else {
	    // Run countdown timer
	    clock = $(".clock").FlipClock(diff, {
	      clockFace: "DailyCounter",
	      countdown: true,
	      callbacks: {
	        stop: function() {
	          console.log("Timer has ended!")
	          next();
	        }
	      }
	    });
	    
	    // Check when timer reaches 0, then stop at 0
	    function checktime() {
	      let t = clock.getTime();
	      if (t <= 0) {
	        clock.setTime(0);
	      }
	      setTimeout(function() {
	        checktime();
	      }, 1000);
	    }
	    setTimeout(function() {
	      checktime();
	    }, 1000);
	  }
	}
	changeBackground(bgImage) {
		let x = document.getElementById('right')
	}
	buyNow() {
		this.setState({mode:'buyNow'})
	}
	learnMore() {
		window.location.assign(this.getCurrentProduct().learn)
	}
	completePurchase() {
		let name = document.getElementById('name').value;
		let phone = document.getElementById('phone').value;
		let email = document.getElementById('email').value;
		$.ajax({
		    url: "/buynow",
		    type: "PUT",
		    dataType: "JSON",
		    data: {name:name, email:email,phone:phone},
		        success: function(response, status, http) {
		            if (response) {
		            	console.log('test2')
		            }
		            console.log('test1')
		    	}
		});
		this.setState({mode:'purchaseCompleted'})
	}
	renderCompletePuchase() {
		return (
			<div className='container-fluid'>
				<div id='page' className='row'>
					<div id='thanks' className='col-md-12' style={{backgroundImage: 'url(../images/desktop-bg-buynow.png)'}}>
						<p className='h1'>Thank you For your purchase, we'll give you a call soon</p>
						<button onClick={function() {location.reload()}} type='button' className='col-md-4 btn btn-lg btn-danger'>Back</button>
					</div>
				</div>
			</div>
		)
	}
	renderBuyNow() {
		return (
			<div className='container-fluid'>
				<div id='page' className='row'>
			    	<div id='left' className='col-lg-3 col-md-12 no-float'>
						<div className='row'>
							<img src = "images/logo.png" className = "col-lg-8 col-md-6" />
							<div id='description' className='col-lg-12 col-md-6'>
								<p className='h1'>{this.getCurrentProduct().brand}</p>
								<p className='h2'>{this.getCurrentProduct().model}</p>
								<p className='h3'>{this.getCurrentProduct().description}</p>
								<p className='h3 features'>Features:</p>
								<p className='h5'>{this.getCurrentProduct().features[0]}</p>
								<p className='h5'>{this.getCurrentProduct().features[1]}</p>
								<p className='h5'>{this.getCurrentProduct().features[2]}</p>
								<button onClick={this.learnMore} type='button' className='btn btn-info'>Learn More</button>
							</div>
						</div>
					</div>
			    	<div id='right' className='col-lg-9 no-float' style={{backgroundImage: 'url(../images/desktop-bg-buynow.png)'}}>
			    		<div id='form'>
							<p className='text-center h2'>Name</p>

							<div id='dumb' hidden></div>
							
							<div className='row text-input'>
							<input className='col-md-6 offset-md-3' id='name' type='text' />
							</div>

							<p className='text-center h2'>Phone Number</p>

							<div className='row text-input'>
							<input className='col-md-6 offset-md-3 text-inputs' id='phone' type='text' />
							</div>

							<p className='text-center h2'>Email</p>

							<div className='row text-input'>
							<input className='col-md-6 offset-md-3 text-inputs' id='email' type='text' />
							</div>

							<div className='row'>
							<button className='complete col-md-4 offset-md-4 btn btn-lg btn-danger' onClick={this.completePurchase} type='button'>Complete Purchase</button>
			    			</div>
			    		</div>
			    	</div>
			    </div>
		    </div>
		)
	}
	renderStarted(){
		return (
			<div className='container-fluid'>
				<div id='page' className='row'>
			    	<div id='left' className='col-lg-3 col-md-12 no-float'>
						<div className='row'>
							<div className='col-lg-8 col-md-4'>
								<img src = "images/logo.png" className = "responsive"/>
							</div>
							<div id='description' className='col-lg-12 col-md-8'>
								<p className='h1'>{this.getCurrentProduct().brand}</p>
								<p className='h2'>{this.getCurrentProduct().model}</p>
								<p className='h3 desc'>{this.getCurrentProduct().description}</p>
								<p className='h3 features'>Features:</p>
								<p className='h5'>{this.getCurrentProduct().features[0]}</p>
								<p className='h5'>{this.getCurrentProduct().features[1]}</p>
								<p className='h5'>{this.getCurrentProduct().features[2]}</p>
								<button onClick={this.learnMore} type='button' className='btn btn-info'>Learn More</button>
							</div>
						</div>
					</div>
			    	<div id='right' className='col-lg-9 col-md-12 no-float' style={{backgroundImage: 'url('+this.getCurrentProduct().bgImage+')'}}>
						<div className='buytimeblock'>
							<div className='container' id='timer'>
								<div className="clock"></div>
							</div>
							<div id='buy' >
								<br />
								<div className='col-lg-4 col-md-3'></div>
								<button onClick={this.buyNow} type='button' className='col-lg-4 col-md-6 btn btn-lg btn-danger btn-lg'>Buy Now</button>
								<div className='col-lg-4 col-md-3'></div>
							</div>
			    		</div>
			    	</div>
			    </div>
		    </div>
		)
	}
	renderNotStarted() {
		return (
			<div className='container-fluid'>
				<div id='page' className='row'>
			    	<div id='left' className='col-lg-3 col-md-12 no-float'>
						<div className='row'>
							<div className='col-lg-8 col-md-4'>
								<img src = "images/logo.png" className = "responsive" />
							</div>
							<div id='description' className='col-lg-12 col-md-8'>
								<p className='h1'>The Sale Is From</p>
								<p className='h1'>9:00am to 9:00pm</p>
								<p className='desc h2'>Wednesday October 13</p>
								<p className='h2'>One product will be available each hour.</p>
								<p className='h2'>Once the hour is up, the deal is gone forever!</p>
							</div>
						</div>
					</div>
			    	<div id='right' className='col-lg-9 no-float' style={{backgroundImage: 'url(../images/desktop-bg-notstarted.png)'}}>
						<div className='container' id='timerNotStarted'>
							<div className="clock"></div>
						</div>
						<div id='buy'>
							<br />
							<div className='col-lg-4 col-md-3'></div>
							<button hidden onClick={this.buyNow} type='button' className='col-lg-4 col-md-6 btn btn-lg btn-danger btn-lg'>Buy Now</button>
							<div className='col-lg-4 col-md-3'></div>
						</div>
			    	</div>
			    </div>
		    </div>
		  )
	}
	render() {
		if (this.state.mode === 'loading') {
			return <div></div>
		}
		else if (this.state.mode === 'started') {
			return this.renderStarted();
		}
		else if (this.state.mode === 'notStarted') {
			return this.renderNotStarted();
		} 
		else if (this.state.mode === 'buyNow') {
			return this.renderBuyNow();
		}
		else if (this.state.mode === 'purchaseCompleted') {
			return this.renderCompletePuchase();
		}
		else {
			return window.location.assign('http://www.thepowercentre.ca')
		}
	}
}


var el = document.getElementById('root');
ReactDOM.render(<App />, el)