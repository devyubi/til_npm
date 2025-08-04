import axios from "axios";

const photoUrl = "https://jsonplaceholder.typicode.com/photos";

// 할일 목록 전체 호출
const getPhotos = async () => {
  try {
    const res = await axios.get(photoUrl);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

// 할일 목록 한개 호출
const getPhoto = async data => {
  try {
    const res = await axios.get(photoUrl, data);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

// 할일 한개 추가
const postPhoto = async id => {
  try {
    const res = await axios.post(`${photoUrl}/${id}/`);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

// 할일 삭제
const deletePhoto = async () => {
  try {
    const res = await axios.delete(`${photoUrl}/${id}/`);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

// 할일 전체 업데이트
const putPhoto = async () => {
  try {
    const res = await axios.put(`${photoUrl}/${id}/`);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

// 할일 일부분 수정
const patchPhoto = async () => {
  try {
    const res = await axios.patch(`${photoUrl}/${id}/`);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

export { deletePhoto, getPhoto, getPhotos, patchPhoto, postPhoto, putPhoto };

