AFRAME.registerComponent('custom-behavior-setup', {
    // a hack to make get a hole cutout of the floor in the environment component.      
      init() {
        this.setupWater();
        this.hackEnvironment();
      },
      animateWater() {
        // on 0 and 4, start animation
        // that should last for 0 & 1
        this.subSection = this.subSection+1 === 8 ? 0 : this.subSection+1;
        let sec = this.subSection;
        console.log(this.subSection)
        if (sec === 0 || sec === 4) {
          // more muted colors under the moon
          this.water.setAttribute('animation','to', sec === 0 ? "#0006FF" : "#044875")
          this.water.setAttribute('animation__2','to',sec === 0 ? "#B8B9F0" : "#919191")
          
          this.water.emit(`basestart`, null, false);
          this.water.emit(`foamstart`, null, false);
        }
      },
      setupWater() {
        let orbit = document.querySelector('a-super-sky').getAttribute('orbitduration');
        let orbitInMs = orbit*60*1000;
        let eighth = orbitInMs/4;
        this.water = document.querySelector('a-water');
        this.subSection = -1;
        this.water.setAttribute('animation','dur',eighth)
        this.water.setAttribute('animation__2','dur',eighth)
        this.animateWater();
        setInterval(this.animateWater.bind(this),eighth)
      },
      hackEnvironment() {
        setTimeout(() => {
            document.querySelector('.environmentGround').object3D.children[0].geometry = 
              document.querySelector('a-ring').object3D.children[1].geometry;
            // we want the dressing to have shadows, but we have to wait until after environment component has added the dressing
            document.querySelector('.environmentDressing').setAttribute('shadow', {receive:true, cast:true})
            // we have to steal back fog control from aframe-environment-component
            AFRAME.scenes[0].setAttribute('fog','color','black')
        },1);
      },
    })