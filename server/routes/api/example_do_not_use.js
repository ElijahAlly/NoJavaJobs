const express = require('express');
const router = express.Router();

// create comment
// needs...
// in body: text, userId, playlistId
// in params: nothing
// router.post('/', (req, res) => {
//     const { errors, isValid } = validateCommentInput(req.body);

//     if (!isValid) return res.status(400).json(errors);

//     let newComment = new Comment(req.body);

//     newComment
//         .save()
//         .then((comment) => {
//             // adds comment to playlist's comments array
//             Playlist.findById(comment.playlistId)
//                 .then((playlist) => {
//                     playlist.comments.push({
//                         id: comment._id,
//                         text: comment.text,
//                         userId: comment.userId,
//                         username: comment.username,
//                         playlistId: comment.playlistId,
//                     });
//                     playlist
//                         .save()
//                         .then(() => res.json('comment posted'))
//                         .catch(() => res.json('comment not posted'));
//                 })
//                 .catch(() => res.json('could not find playlist'));
//         })
//         .catch(() => res.json('could not save comment'));
// });

// router.delete('/:playlistId/:commentId', async function (req, res) {
//     let objectID = mongoose.mongo.ObjectID(req.params.commentId);
//     try {
//         const playlist = await Playlist.findByIdAndUpdate(req.params.playlistId, {
//             $pull: { comments: { id: objectID } },
//             function(err, comment) {
//                 if (err) {
//                     console.log('ERROR: ' + err);
//                 }
//                 console.log('comments' + comment);
//             },
//         });

//         if (!playlist) {
//             return res.status(400).send('Playlist not found');
//         }

//         await Comment.findByIdAndDelete(req.params.commentId).then(() =>
//             res.send('Success')
//         );
//     } catch (err) {
//         console.log(err);
//         res.status(500).send('Something went wrong');
//     }
// });

// // update comments
// // needs...
// // in body: text, userId, playlistId
// // in params: comment id
// router.patch('/:id', (req, res) => {
//     Comment.findOneAndUpdate({ _id: req.params.id }, req.body)
//         .then(() => {
//             const comment = req.body;
//             comment._id = req.params.id;

//             // adds updated comment to playlist
//             Playlist.findById(comment.playlistId)
//                 .then((playlist) => {
//                     playlist.comments.forEach((com) => {
//                         if (com.id.toString() === comment._id.toString()) {
//                             const indx = playlist.comments.indexOf(com);
//                             playlist.comments.splice(indx, 1);
//                             playlist.comments.push({
//                                 id: comment._id,
//                                 text: comment.text,
//                                 userId: comment.userId,
//                             });
//                             playlist.save();
//                         }
//                     });
//                 })
//                 .then(() => {
//                     res.json(comment);
//                 });
//         })
//         .catch((err) =>
//             res.status(500).json({ couldNotupdate: 'could not update comment' })
//         );
// });

module.exports = router;