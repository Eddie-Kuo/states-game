import { supabase } from '@/lib/initSupabase';
import Ionicons from '@expo/vector-icons/AntDesign';
import { makeRedirectUri } from 'expo-auth-session';
import * as QueryParams from 'expo-auth-session/build/QueryParams';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

WebBrowser.maybeCompleteAuthSession(); // required for web only
const redirectTo = makeRedirectUri();

const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);

  if (errorCode) throw new Error(errorCode);
  const { access_token, refresh_token } = params;

  if (!access_token) return;

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });
  if (error) throw error;
  return data.session;
};

const performGoogleOAuth = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
      skipBrowserRedirect: true,
    },
  });
  if (error) throw error;

  const res = await WebBrowser.openAuthSessionAsync(
    data?.url ?? '',
    redirectTo
  );

  if (res.type === 'success') {
    const { url } = res;
    await createSessionFromUrl(url);
  }
};

export default function SignInWithGoogle() {
  // Handle linking into app from email app.
  const url = Linking.useURL();
  if (url) createSessionFromUrl(url);

  return (
    <TouchableOpacity
      onPress={performGoogleOAuth}
      style={[styles.signInButton, { backgroundColor: 'lightsteelblue' }]}>
      <Ionicons name='google' size={16} color='darkslategrey' />
      <Text style={[styles.signInText, { color: 'darkslategray' }]}>
        Sign in with Google
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  signInButton: {
    height: 40,
    width: '100%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  signInText: { fontWeight: 'bold', fontSize: 18 },
});
