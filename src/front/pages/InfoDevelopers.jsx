
import "../styles/pages/infodevelopers.css";

export const InfoDevelopers = () => {
    return (
        <>
            <div className="d-flex justify-content-center p-5">
                <h1 className="logo-text pets_title text-center">Nuestros desarrolladores</h1>
            </div>
            <div className="container pb-5">
                <div className="row justify-content-center g-4">
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="card h-100 shadow-sm text-center p-3">
                            <div className="d-flex justify-content-center mt-4 mb-3">
                                <img
                                    src="https://res.cloudinary.com/dzvcmydip/image/upload/v1764797331/Imagen_de_WhatsApp_2025-12-03_a_las_15.22.15_1667702b_ijjedm.jpg"
                                    className="rounded-circle infodeveloper_image"
                                    alt="Developer 1"

                                />
                            </div> 
                            <div className="card-body"> 
                                <h5 className="card-title mb-3">Esteban Ossandon</h5>
                                <h6 className="card-subtitle mb-2 text-muted mb-3">Full Stack Developer</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="card h-100 shadow-sm text-center p-3">
                            <div className="d-flex justify-content-center mt-4 mb-3">
                                <img
                                    src="https://res.cloudinary.com/dzvcmydip/image/upload/v1764797298/Imagen_de_WhatsApp_2025-12-03_a_las_16.28.24_d3aeec2e_tjclhh.jpg"
                                    className="rounded-circle infodeveloper_image"
                                    alt="Developer 2"
                                />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title mb-3">Verónica Rodríguez</h5>
                                <h6 className="card-subtitle mb-2 text-muted mb-3">Full Stack Developer</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="card h-100 shadow-sm text-center p-3">
                            <div className="d-flex justify-content-center mt-4 mb-3">
                                <img
                                    src="https://i.pinimg.com/736x/3a/64/84/3a64841d1aeeafad933f6cb7a3efc467.jpg"
                                    className="rounded-circle infodeveloper_image"
                                    alt="Developer 3"
                                />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title mb-3">Daniel Nova</h5>
                                <h6 className="card-subtitle mb-2 text-muted mb-3">Full Stack Developer</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
