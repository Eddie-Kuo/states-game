import { supabase } from '@/lib/initSupabase';
import * as AppleAuthentication from 'expo-apple-authentication';
import { Alert, Platform, StyleSheet } from 'react-native';

export default function SignInWithApple() {
  if (Platform.OS === 'ios')
    return (
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={25}
        style={styles.signInButton}
        onPress={async () => {
          try {
            const credential = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
              ],
            });
            // Sign in via Supabase Auth.
            if (credential.identityToken) {
              const {
                error,
                data: { user },
              } = await supabase.auth.signInWithIdToken({
                provider: 'apple',
                token: credential.identityToken,
              });
              console.log(JSON.stringify({ error, user }, null, 2));
            } else {
              throw new Error('No identityToken.');
            }
          } catch (error: any) {
            if (error.code === 'ERR_REQUEST_CANCELED') {
              // handle that the user canceled the sign-in flow
              return Alert.alert('You must sign in to continue');
            } else {
              console.log('🚀 ~ SignInWithApple.tsx={ ~ error:', error);
            }
          }
        }}
      />
    );
  return <>{/* Todo: Implement Android Auth options. */}</>;
}

const styles = StyleSheet.create({
  signInButton: {
    height: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 24,
  },
});
