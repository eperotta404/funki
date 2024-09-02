import { SignIn } from 'src/core/domain/useCases/SignIn';
import { authService } from 'src/core/infrastructure/instances';

import { setSession } from './utils';

const signInUseCase = new SignIn(authService);

// ----------------------------------------------------------------------

export type SignInParams = {
  email: string;
  password: string;
};

/** **************************************
 * Sign in
 *************************************** */
export const signInWithPassword = async ({ email, password }: SignInParams): Promise<void> => {
  try {
    const ressponse = await signInUseCase.execute(email, password);
    const { accessToken } = ressponse;

    if (!accessToken) {
      throw new Error('Access token not found in response');
    }

    setSession(accessToken);
  } catch (error) {
    console.error('Error during sign in:', error);
    throw error;
  }
};

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async (): Promise<void> => {
  try {
    await setSession(null);
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};
