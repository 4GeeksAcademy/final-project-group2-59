import React from "react";

export const PetCard = ({ pet }) => {

    const imageURL = pet.image;

    const getSexIcon = () => {
        if (pet.sex === 'Macho') {
            return <i className="fa-solid fa-mars pets_sex-icon" style={{ color: '#4A90E2' }}></i>;
        } else if (pet.sex === 'Hembra') {
            return <i className="fa-solid fa-venus pets_sex-icon" style={{ color: '#E91E63' }}></i>;
        }
        return null
    };

    const calculateAge = () => {

        const birthDate = new Date(pet.birthdate);
        const today = new Date();

        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();

        if (months < 0) {
            years--;
            months += 12;
        }

        if (years === 0) {
            return months === 1 ? "1 mes" : `${months} meses`;
        } else if (years === 1) {
            return months === 0 ? "1 año" : `1 año y ${months} ${months === 1 ? 'mes' : 'meses'}`;
        } else {
            return months === 0 ? `${years} años` : `${years} años y ${months} ${months === 1 ? 'mes' : 'meses'}`;
        }
    };

    return (
        <div className="">
            <div className="d-flex justify-content-center">
                <div className="card p-3" >
                    <img src={imageURL} className="card-img-top petcard_img" alt={pet.name} />
                    <div className="card-body">
                        <div className="pets_title-container">
                            <h2 className="card-title">{pet.name}</h2>
                            {getSexIcon()}
                        </div>
                        <h4>Edad: {calculateAge()}</h4>
                        <div className="d-flex justify-content-between mt-3 p-2">
                            <button className="btn btn-danger" type="submit"><i className="fa-regular fa-heart"></i></button>
                            <a href="#" className="btn btn-light">Más sobre mi...</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}