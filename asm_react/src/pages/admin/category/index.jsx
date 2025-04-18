import { Link } from "react-router-dom";

const index = () => {


    useEffect(() => {
       
        getData();
      }, []);
      const getData = async () => {
        try {
          // Lấy giá trị token từ cookie
          // Truyền token vào header của api
    
          const token = cookies.token
    
          const res = await axios.get(`${Constanst.DOMAIN_API}/categories/list`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log("Response === ", res.data.data);
          console.log("abc");
    
          setData(res.data.data);
        } catch (e) {
          console.log("Error === ", e);
        }
      };
      const imageStyle = { width: "100px", height: "100px" };
      const renderCategory = (value, index) => {
        return (
          <tr key={index}>
            <td>{value.id}</td>
            {/* <td>{value.username}</td> */}
            <td>{value.name}</td>
          
            <td>
              <img
                src={`${Constanst.DOMAIN_API}/uploads/${value.image}`}
                style={imageStyle}
              />
            </td>
            <td>{value.status == 0 ? "ẩn" : "hiện"}</td>
            <td>{value.description}</td>
            <td>
              {/* Click vào nút cập nhật */}
              {/* Thực hiện chuyển trang */}
              {/* /register-hook-form?id=123 */}
              {/* Query params */}
              <Link to={`/admin/categories/edit/${value.id}`} type="button" class="btn btn-warning me-3">
               Sửa
              </Link>
              <button onClick={deleteCategory.bind(this, {id: value.id, name: value.name})} type="button" class="btn btn-danger">
                Xóa
              </button>
            </td>
          </tr>
        );
      };
      const deleteCategory = async (props) => {
        try {
            const { id } = props; // Lấy id từ props
            
            // Gọi API DELETE với id trong URL
            await axios.delete(`${Constanst.DOMAIN_API}/categories/${id}`);
    
            // Gọi lại hàm getData để tải lại danh sách
            getData();
        } catch (e) {
            console.log(e);
        }
    }
    return (

        <>
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Danh sách danh mục</h3>
                    <Link className="btn btn-success" to={'/admin/categories/add'}>Thêm mới</Link>
                </div>
                <div className="card-body">
                    {/* danh sách danh mục */}

                        <table id="example1" className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Tên</th>
                                   
                            
                                    <th>Ảnh</th>
                                    <th>Trang thái</th>
                                    <th>Mô tả</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>danh mục 1</td>
                                    <td>
                                        <Link className="btn btn-warning" to={`/admin/categories/edit/1`}>Sửa</Link>
                                        <button className="btn btn-danger" >Xóa</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                </div>
            </div>
        </>
    )
}

export default index;