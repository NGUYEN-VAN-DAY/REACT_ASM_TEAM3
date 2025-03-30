import { Link } from "react-router-dom";

const index = () => {


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