import Axios from 'axios'
import { Request, Response } from 'express'
import { config } from '../config'

export async function getHome(req: Request, res: Response): Promise<void> {
  const containers = await Axios.get(config.agentUrl + '/containers').then(({ data }) => data)
  res.render('Home', { containers })
}
