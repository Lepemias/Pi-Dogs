import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postNewDog } from "../redux/actions";
import styles from "./form.module.css";
import { useNavigate } from "react-router-dom";
import { getAllDogs, getTemperaments } from "../redux/actions";

export default function Form() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alltempers = useSelector((state) => state.temperaments);

  const [errors, setErrors] = useState({
    errorName: false,
    errorHeight: false,
    errorWeight: false,
    hasErrors: "yes",
  });

  const [temps, setTemps] = useState([]);

  useEffect(() => {
    setFormData({
      ...formData,
      temperament: temps,
    });
  }, [temps]);

  const [saveSpecs, setSaveSpecs] = useState({
    minH: "",
    maxH: "",
    minW: "",
    maxW: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    height: "",
    weight: "",
    life_span: "14",
    temperament: [],
    img: "",
  });

  const successs = () => {
    alert("Raza creada con exito!");
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postNewDog(formData));
    successs();
    dispatch(getAllDogs());
    dispatch(getTemperaments());
    navigate("/dogs");
    setFormData({
      name: "",
      height: "",
      weight: "",
      life_span: "14",
      temperament: [],
      img: "",
    });
  }

  function handleChange(e) {
    e.preventDefault();
    validateRequired();

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  }

  function handleSpecs(e) {
    setSaveSpecs({
      ...saveSpecs,
      [e.target.name]: e.target.value,
    });
    setFormData({
      ...formData,
      height: `${saveSpecs.minH} - ${saveSpecs.maxH}`,
      weight: `${saveSpecs.minW} - ${saveSpecs.maxW}`,
    });
  }

  function handleTemps(e) {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setTemps(value);
  }

  function validateName() {
    formData.name.length < 5
      ? setErrors({
          ...errors,
          errorName: "El Nombre debe contener al menos 5 caracteres",
        })
      : setErrors({
          ...errors,
          errorName: true,
        });
    validateRequired();
  }

  function validateHeight() {
    !formData.height.length
      ? setErrors({
          ...errors,
          errorHeight: "Altura es un campo requerido",
        })
      : setErrors({
          ...errors,
          errorHeight: true,
        });
    validateRequired();
  }

  function validateWeight() {
    !formData.weight.length
      ? setErrors({
          ...errors,
          errorWeight: "Peso es un campo requerido",
        })
      : setErrors({
          ...errors,
          errorWeight: true,
        });
    validateRequired();
  }

  function validateRequired() {
    if (
      errors.errorWeight === true &&
      errors.errorHeight === true &&
      errors.errorName === true
    ) {
      setErrors({
        ...errors,
        hasErrors: "no",
      });
    }
  }
  return (
    <div className={styles.formContainer}>
      <div className={styles.form}>
        <div className={styles.errorBox}>
          <div className={styles.errorMsg1}>
            <p>{errors.errorName}</p>
          </div>

          <div className={styles.errorMsg2}>
            <p>{errors.errorHeight}</p>
          </div>
          <div className={styles.errorMsg3}>
            <p>{errors.errorWeight}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.divCenter}>
            <label>*Nombre: </label>
            <input
              className={styles.input}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={validateName}
            />

            <label>*Altura: </label>

            <input
              className={styles.input}
              type="number"
              step="1"
              name="minH"
              min="1"
              max="100"
              placeholder="Min"
              onChange={handleSpecs}
              onBlur={validateHeight}
            />

            <input
              className={styles.input}
              type="number"
              step="1"
              name="maxH"
              min="1"
              max="999"
              placeholder="Max"
              onChange={handleSpecs}
              onBlur={validateHeight}
            />

            <label>*Peso: </label>

            <input
              className={styles.input}
              type="number"
              step="1"
              name="minW"
              min="1"
              max="100"
              placeholder="Min"
              onChange={handleSpecs}
              onBlur={validateWeight}
            />

            <input
              className={styles.input}
              type="number"
              step="1"
              name="maxW"
              min="1"
              max="999"
              placeholder="Max"
              onChange={handleSpecs}
              onBlur={validateWeight}
            />

            <label>Expectativa de vida: </label>
            <h6>{"(entre 0 y 100)"}: </h6>

            <div className={styles.rangeDiv}>
              <input
                className={styles.rangeInput}
                type="range"
                min="1"
                max="100"
                name="life_span"
                step="1"
                value={formData.life_span}
                onChange={handleChange}
              />

              <div className={styles.rangeValue}>
                <p>{formData.life_span}</p>
              </div>
            </div>

            <label>Temperamento: </label>
            <br />

            <select
              multiple={true}
              name="tempers"
              className={styles.chkUl}
              onChange={handleTemps}
              value={temps}
            >
              {alltempers.map((e, index) => {
                return (
                  <option key={index} className={styles.option} value={e.name}>
                    {e.name}
                  </option>
                );
              })}
            </select>

            <label>Imagen: </label>
            <input
              className={styles.input}
              type="text"
              name="img"
              value={formData.img}
              placeholder="Ingrese URL..."
              onChange={handleChange}
            />
            <div className={styles.note}>
              <p>{"(*): Los campos son obligatorios"}</p>
            </div>
            <button
              className={styles.btnForm}
              type="submit"
              disabled={errors.hasErrors === "yes"}
            >
              Crear Raza
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
