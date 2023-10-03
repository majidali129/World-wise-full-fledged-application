import supabase, { supabaseUrl } from "./supabase";


export const signUp = async ({email, password, fullName}) => {  
  const {data, error} = await supabase.auth.signUp({
    email, password, options: {
      data: {
        fullName,
      avatar: '',
      }
    }
  })
  if (error) {
    throw new Error(error.message);
  }  
  return data;
}



export const login = async ({ email, password }) => {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  // console.log(data);
  

  if (error) {
    throw new Error(error.message);
  }
  // console.log(data);
  
  return data;
};


export const getCurrentUser = async () => {
  const {data: session} = await supabase.auth.getSession();
  if(!session?.session) return null;

  const {data, error} = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }
  // console.log(data?.user);
  
  return data?.user;
}


export const updateCurrentUser = async ({password, fullName, avatar}) => {

  // 1) UPDATE PASSWORD || FULLNAME
  let updateData;
  if(password) updateData = {password};
  if(fullName) updateData = {data: {fullName}};
  const {data, error} = await supabase.auth.updateUser(updateData)

  if(error) throw new Error(error.message);
  if(!avatar) return data;
  // UPLOAD AVATAR
  const fileName = `avatar-${data?.user?.id}-${Math.random()}`;
  // console.log(fileName);

  const {error: storageError} = await supabase.storage.from('avatars').upload(fileName, avatar);

  if(storageError) throw new Error(storageError?.message);


  // UPDATE AVATAR  IN USER
  const {data: updatedUser, error: errorOfAvatar} = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    }
  })

  if(errorOfAvatar) throw new Error(errorOfAvatar?.message);
  
  return {updatedUser};
}


export const logout = async () => {
  const {error} = await supabase.auth.signOut();
  if (error) {
    console.log(error.message);
    
    throw new Error(error.message);
  }
}
