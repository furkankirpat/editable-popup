(function () {
    class Popup {
        state = {
            css:{
                popupContainer: {
                    width:"300px",
                    backgroundColor:"#9c9c9c",
                    color:"white",
                    padding:"10px 10px 20px 10px",
                    textAlign:"center",
                    position:"fixed",
                    left:"0",
                    right:"0",
                    margin:"0 auto",
                    top:"35%",
                    border:"10px solid gray",
                    fontWeight:'normal',
                    fontStyle:'normal',
                    textDecoration:'inherit'
                },
                title:{
                    fontWeight:"inherit",
                    fontFamily:"Avenir, Helvatica, sans-serif",
                    color:"#000",
                    fontWeight:'inherit',
                    fontStyle:'inherit',
                    textDecoration:'inherit'
                },
                btnOk:{
                    backgroundColor:"#000",
                    color:"white",
                    padding:"7px",
                    cursor:"pointer",
                    outline:"none",
                    fontWeight:'inherit',
                    fontStyle:'inherit',
                    textDecoration:'inherit'
                }
            },
            template: '',
            text:'LOREM IPSUM DOLOR SIT AMET',
            targetOrigin:'http://localhost',
            selectedComponent:'',
        }
    
        constructor() {
            window.onload = () => this.updateIframe();
    
            this.renderTemplate();
            this.setEvents();
        }
        
        updateIframe() {
            document.querySelector('iframe').contentWindow.postMessage(this.state.template, this.state.targetOrigin);
        }
    
        changeColor(e) {
            if(this.state.selectedComponent != '') {
                
                if(this.state.selectedComponent == "modal" || this.state.selectedComponent == "button") {
                    this.state.css[(this.state.selectedComponent == "modal" ? "popupContainer" : "btnOk")].backgroundColor = e.target.value;
                } else if(this.state.selectedComponent == "title" || this.state.selectedComponent == "button-text") {
                    this.state.css[(this.state.selectedComponent == "title" ? "title" : "btnOk")].color = e.target.value;
                }
    
                this.renderTemplate();
                this.updateIframe();
            } else {
                alert('Özelliği kullanabilmek için lütfen önce bileşen seçin!');
            }
        }

        selectComponent(e) {
            this.state.selectedComponent = e.target.getAttribute('model');
            
            this.enableOrDisableStyleTypesByComponent();
        }

        enableOrDisableStyleTypesByComponent() {
            document.querySelectorAll('#settings .font-style').forEach((styleType) => {
                
                styleType.classList.add('disabled-font-style');
                styleType.setAttribute('disabled', 'disabled');
                
                styleType.classList.remove('selected-font-style');

                if(this.state.selectedComponent == 'title' || this.state.selectedComponent == 'button-text') {
                    styleType.classList.remove('disabled-font-style');
                    styleType.removeAttribute('disabled');
                }

                if(this.state.selectedComponent == 'title' && this.state.css.title.fontWeight == 'bold' && styleType.getAttribute('model') == 'bold') {
                    styleType.classList.add('selected-font-style');
                } 
                
                if(this.state.selectedComponent == 'button-text' && this.state.css.btnOk.fontWeight == 'bold' && styleType.getAttribute('model') == 'bold') {
                    styleType.classList.add('selected-font-style');
                }

                if(this.state.selectedComponent == 'title' && this.state.css.title.fontStyle == 'italic' && styleType.getAttribute('model') == 'italic') {
                    styleType.classList.add('selected-font-style');
                } 
                
                if(this.state.selectedComponent == 'button-text' && this.state.css.btnOk.fontStyle == 'italic' && styleType.getAttribute('model') == 'italic') {
                    styleType.classList.add('selected-font-style');
                }

                if(this.state.selectedComponent == 'title' && this.state.css.title.textDecoration == 'underline' && styleType.getAttribute('model') == 'underline') {
                    styleType.classList.add('selected-font-style');
                } 

                if(this.state.selectedComponent == 'button-text' && this.state.css.btnOk.textDecoration == 'underline' && styleType.getAttribute('model') == 'underline') {
                    styleType.classList.add('selected-font-style');
                }
            });
        }

        selectStyleType(e) {
           
            if(this.state.selectedComponent === '') {
                alert('Özelliği kullanabilmek için lütfen önce bileşen seçin!');

                return false;
            }

            const selectedType = e.target.getAttribute('model');

            console.log(selectedType, this.state.selectedComponent);

            if(!e.target.classList.contains('selected-font-style')) {
                e.target.classList.add('selected-font-style');

                if(selectedType == 'bold' && this.state.selectedComponent == "title") {
                    this.state.css.title.fontWeight = "bold";
                }
                else if(selectedType == 'bold' && (this.state.selectedComponent == "button" || this.state.selectedComponent == "button-text")) {
                    this.state.css.btnOk.fontWeight = "bold";
                }
                else if(selectedType == 'italic' && this.state.selectedComponent == "title") {
                    this.state.css.title.fontStyle = "italic";
                }
                else if(selectedType == 'italic' && (this.state.selectedComponent == "button" || this.state.selectedComponent == "button-text")) {
                    this.state.css.btnOk.fontStyle = "italic";
                }
                else if(selectedType == 'underline' && this.state.selectedComponent == "title") {
                    this.state.css.title.textDecoration = "underline";
                }
                else if(selectedType == 'underline' && (this.state.selectedComponent == "button" || this.state.selectedComponent == "button-text")) {
                    this.state.css.btnOk.textDecoration = "underline";
                }

            } else {
                e.target.classList.remove('selected-font-style');

                if(selectedType == 'bold' && this.state.selectedComponent == "title") {
                    this.state.css.title.fontWeight = "normal";
                }
                else if(selectedType == 'bold' && (this.state.selectedComponent == "button" || this.state.selectedComponent == "button-text")) {
                    this.state.css.btnOk.fontWeight = "normal";
                }
                else if(selectedType == 'italic' && this.state.selectedComponent == "title") {
                    this.state.css.title.fontStyle = "normal";
                }
                else if(selectedType == 'italic' && (this.state.selectedComponent == "button" || this.state.selectedComponent == "button-text")) {
                    this.state.css.btnOk.fontStyle = "normal";
                }
                else if(selectedType == 'underline' && this.state.selectedComponent == "title") {
                    this.state.css.title.textDecoration = "none";
                }
                else if(selectedType == 'underline' && (this.state.selectedComponent == "button" || this.state.selectedComponent == "button-text")) {
                    this.state.css.btnOk.textDecoration = "none";
                }
            }

            

            this.renderTemplate();
            this.updateIframe();
        }
    
        setEvents() {
            document.querySelector('#changeColor').addEventListener('change', this.changeColor.bind(this));

            document.querySelectorAll('#components .component-item input[type="radio"]').forEach((component) => {
                component.addEventListener('click', this.selectComponent.bind(this));
            });

            document.querySelectorAll('#settings .font-style').forEach((styleType) => {
                styleType.addEventListener('click', this.selectStyleType.bind(this));
            })
        }
    
        renderTemplate() {
            const container = document.createElement('div');
            container.id = "popup-container";
            container.style.width = this.state.css.popupContainer.width;
            container.style.backgroundColor = this.state.css.popupContainer.backgroundColor;
            container.style.padding = this.state.css.popupContainer.padding;
            container.style.position = this.state.css.popupContainer.position;
            container.style.left = this.state.css.popupContainer.left;
            container.style.right = this.state.css.popupContainer.right;
            container.style.margin = this.state.css.popupContainer.margin;
            container.style.top = this.state.css.popupContainer.top;
            container.style.border = this.state.css.popupContainer.border;
            container.style.textAlign = this.state.css.popupContainer.textAlign;
            container.style.fontWeight = this.state.css.popupContainer.fontWeight;
            container.style.fontStyle = this.state.css.popupContainer.fontStyle;
            container.style.textDecoration = this.state.css.popupContainer.textDecoration;
    
            const title = document.createElement('p');
            title.id = "title";
            title.style.fontWeight = this.state.css.title.fontWeight;
            title.style.fontFamily = this.state.css.title.fontFamily;
            title.style.color = this.state.css.title.color;
            title.style.fontWeight = this.state.css.title.fontWeight;
            title.style.fontStyle = this.state.css.title.fontStyle;
            title.style.textDecoration = this.state.css.title.textDecoration;

            title.textContent = this.state.text;
    
            const btnOk = document.createElement('button');
            btnOk.id = "btnOk";
            btnOk.textContent = 'BUTTON';
            btnOk.style.backgroundColor = this.state.css.btnOk.backgroundColor;
            btnOk.style.color = this.state.css.btnOk.color;
            btnOk.style.padding = this.state.css.btnOk.padding;
            btnOk.style.cursor = this.state.css.btnOk.cursor;
            btnOk.style.outline = this.state.css.btnOk.outline;
            btnOk.style.fontWeight = this.state.css.btnOk.fontWeight;
            btnOk.style.fontStyle = this.state.css.btnOk.fontStyle;
            btnOk.style.textDecoration = this.state.css.btnOk.textDecoration;
    
            container.appendChild(title);
            container.appendChild(btnOk);
    
            this.state.template = container.outerHTML;
        }
    }

    const popup = new Popup();
})(this);