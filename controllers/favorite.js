const Favorite = require('../models/Favorite');


//mettre en favoris
exports.postFavorite = async (req, res) => {
    
    const omdbId = req.params.omdbId;
    const userId = req.body.userId; // Utilisez req.body.userId pour récupérer l'ID de l'utilisateur
    const formData = req.body;

    try {
        const favorite = new Favorite({
            ...formData,
            omdbId: omdbId,
            userId: userId
        });

        await favorite.save();
        res.status(201).json({ message: 'Favoris ajouté' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};




//recup mes favoris

exports.getFavorite = (req, res, next) => {
    const userId = req.params.userId;
    Favorite.find({ userId: userId })
    .then(favorite => res.status(200).json(favorite))
    .catch(error => res.status(400).json({ error }));
};


//delete favorite
exports.deleteFavorite = (req, res, next) => {
    Favorite.deleteOne({ _id: req.params.id})
    .then(() => res.status(200).json({ message: "Objet supprimé"}))
    .catch(error => res.status(400).json({ error }))
}

