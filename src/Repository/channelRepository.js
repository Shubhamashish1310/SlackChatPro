import Channel from "../Schema/channelSchema.js";
import crudRepository from "./crudRepository.js";


const channelRepository = {
  ...crudRepository(Channel)
};

export default channelRepository;