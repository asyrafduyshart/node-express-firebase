import express from 'express';
import graphqlHTTP from 'express-graphql';
import { getSchema } from '@risingstack/graffiti-mongoose';

import config from '../../config/config';


// Import Schema from Mongo for Converter
import userSchema from '../models/user.model';
import timelineSchema from '../models/timeline.model';
import commentSchema from '../models/comment.model';


const router = express.Router(); // eslint-disable-line new-cap

const options = {
  mutation: false, // mutation fields can be disabled
  allowMongoIDMutation: false // mutation of mongo _id can be enabled
};


const schema = getSchema([userSchema, timelineSchema, commentSchema], options);

router.use('/graphql', graphqlHTTP({
  schema,
  graphiql: config.env !== 'development'
}));

export default router;

