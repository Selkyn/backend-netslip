const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const session = require('express-session')

const User = require('../models/User'); // On recupere notre model User 
const Role = require('../models/Role');

exports.signup = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const userRole = await Role.findOne({name: 'User'});

        if (!userRole) {
            return res.status(500).json({ message: 'Role "user" not found. Please ensure roles are properly initialized.' });
        }
        const user = new User({
            email: req.body.email,
            pseudo: req.body.pseudo,
            password: hashedPassword,
            roles: [userRole._id]
        });

        await user.save()
        res.status(201).json({ message: 'Compte créé avec succès !' });

        } catch (error) {
            res.status(500).json({ error });
        }
};

exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email }).populate('roles');

        if (!user) {
            return res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' });
        }

        const valid = await bcrypt.compare(req.body.password, user.password);

        if (!valid) {
            return res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' });
        }

        const token = jwt.sign(
            { userId: user._id },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h' }
        );

        res.status(200).json({
            userId: user._id,
            email: user.email,
            pseudo: user.pseudo,
            roles: user.roles.map(role => role.name),
            token: token
        });
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.logout = (req, res, next) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(400).send('Unable to log out');
            } else {
                res.send('Logout successful');
            }
        });
    } else {
        res.end();
    }
};

// exports.addFavorite = async (req, res, next) => {
    
//         const userId = req.params.userId;
//         const omdbId = req.params.omdbId;
      
//         try {
//           // Ajoute le film aux favoris de l'utilisateur en utilisant l'OMDb ID
//           const updatedUser = await User.findByIdAndUpdate(userId, { $addToSet: { favorite: omdbId } }, { new: true });
      
//           // Renvoie la mise à jour de l'utilisateur (cela peut être ajusté en fonction de vos besoins)
//           res.json(updatedUser);
//         } catch (error) {
//           console.error('Erreur lors de l\'ajout aux favoris:', error.message);
//           res.status(500).json({ error: 'Erreur lors de l\'ajout aux favoris' });
//         }
//     }
