import * as apiEntityMapper from "../mapper/apiEntity";

export default class TagManager {
    /**
     * TagManager constructor.
     *
     * @param {ApiService} api
     */
    constructor(api) {
        this._api = api;
        this.getPopular = this.getPopular.bind(this);
    }

    /**
     * Get the most popular tags.
     *
     * @return {Promise<Array<Tag>>}
     */
    async getPopular() {
        const response = await this._api.getTags();
        return apiEntityMapper.toList(response.data, apiEntityMapper.toTag);
    }
}
