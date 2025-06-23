import React, { useEffect } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';

// Sub Pages
import DetailsPageHome from './DetailsPageHome/DetailsPageHome';
import DetailsPageMain from './DetailsPageMain/DetailsPageMain';

export default function DetailsPageIndex() {
  const params = useParams();
  useEffect(() => {

  }, [params])
  return (
    <Routes>
      <Route path="/" element={<DetailsPageHome />} />
      <Route path="/services" element={<DetailsPageMain />} />
      <Route path="/narration" element={<DetailsPageMain />} />
      <Route path="/driving" element={<DetailsPageMain />} />
      <Route path="/control" element={<DetailsPageMain />} />
    </Routes>
  )
}