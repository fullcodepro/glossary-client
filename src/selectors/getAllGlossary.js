import { URL } from '../configs/envs'

export const getAllGlossary = async (options) => (await fetch(`${URL}/api/word/`, options))
