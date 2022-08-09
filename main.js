const form = document.querySelector('form.contact__form');
const btn = document.querySelector('button.contact__cta');
const inputs = document.querySelectorAll('input.contact__input');
const inputsArray = [...inputs];

const expresiones =
{
    name: /^[a-zA-ZÁ-ÿ\s]{1,40}$/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
}

const campos =
{
    name: false,
    email: false
}

const validarCampo = (expresion,input,campo) =>
{
    if(expresion.test(input.value))
    {
        document.getElementById(`group__${campo}`).classList.remove(`contact__group--incorrect`);
        document.getElementById(`group__${campo}`).classList.add(`contact__group--correct`);
        document.querySelector(`div#group__${campo} i`).classList.remove(`fa-circle-xmark`);
        document.querySelector(`div#group__${campo} i`).classList.add(`fa-circle-check`);
        document.querySelector(`#group__${campo} p.contact__input-error`).classList.remove(`contact__input-error--activate`);
        campos[campo] = true;
    }
    else
    {
        document.getElementById(`group__${campo}`).classList.add(`contact__group--incorrect`);
        document.getElementById(`group__${campo}`).classList.remove(`contact__group--correct`);
        document.querySelector(`div#group__${campo} i`).classList.remove(`fa-circle-check`);
        document.querySelector(`div#group__${campo} i`).classList.add(`fa-circle-xmark`);
        document.querySelector(`#group__${campo} p.contact__input-error`).classList.add(`contact__input-error--activate`);
        campos[campo] = false;
    }
}

const validationForm = e =>
{
    (e.target.name == "name")
        ? validarCampo(expresiones.name,e.target,"name")
        : validarCampo(expresiones.email,e.target,"email");
};

form.addEventListener('submit',(e) =>
{
    e.preventDefault();
    if(campos.name && campos.email)
    {
        form.reset();
        document.querySelector("p.contact__message-exito").classList.add("contact__message-exito--activate");
        setTimeout(() => {
            document.querySelector("p.contact__message-exito").classList.remove("contact__message-exito--activate");
        },5000);
        const iconContent = document.querySelectorAll('.contact__group--correct');
        const icons = [...iconContent];
        icons.forEach(icono => icono.classList.remove('contact__group--correct'));
    }
    else
    {
        document.getElementById('contact__message').classList.add('contact__message--activate');
    }
});

inputsArray.forEach(input =>
{
    input.addEventListener('keyup',validationForm);
    input.addEventListener('blur',validationForm);
})