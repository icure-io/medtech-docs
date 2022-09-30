import process from 'process';
import axios, { Method } from 'axios';

export async function getLastEmail(email: string): Promise<any> {
  const msgGtwUrl = process.env.ICURE_MSG_GTW_URL
  const specId = process.env.SPEC_ID

  const emailOptions = {
    method: 'GET' as Method,
    url: `${msgGtwUrl}/${specId}/lastEmail/${email}`,
  }
  const { data: response } = await axios.request(emailOptions)
  return response
}
