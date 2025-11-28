export function DogCard({ rotate, img, text, extraClass }) {
    return (
        <div className={`dog-card ${rotate} card-move position-relative p-3 bg-white rounded mb-4 `}>
            <div className="clavo position-absolute top-0 start-50 translate-middle-x"></div>

            <img src={img} className="img-fluid rounded mb-3" alt="Perrito" />

            <p className="text-muted mb-0">
                {text}
            </p>
        </div>
    );
}
