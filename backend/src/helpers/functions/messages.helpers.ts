
import config from 'config';
const callbackurl = <string>config.get('CALLBACK_URL') || '';

const accountCreationMsg = (firstName: string, token: string, pin: string) => {
    const str = `Welcome ${firstName}. Kindly follow this link ${callbackurl}/activate-account?token=${token} to activate your account.
    Your PIN is ${pin}`;

    return str;
}


export { accountCreationMsg }