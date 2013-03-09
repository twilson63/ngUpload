using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace aspnet.mvc.Controllers
{
    public class UploadController : Controller
    {
        //
        // GET: /Upload/

        [HttpPost]
        public ActionResult Index(string delay, HttpPostedFileBase file)
        {
            if (!string.IsNullOrEmpty(delay) && delay == "yes")
                Thread.Sleep(3000);

            if (file == null || file.ContentLength == 0)
                return new ContentResult
                {
                    Content = "No file uploaded at " + DateTime.Now.ToString()
                };
            else
                return new ContentResult
                {
                    Content = string.Format("<b>{0}</b> uploaded to the server at {1}", Path.GetFileName(file.FileName), DateTime.Now.ToString())
                };
        }

        [HttpPost]
        public ActionResult FullForm(string fullname, string gender, string color, HttpPostedFileBase file)
        {
            string pictureUrl = "/path/to/default/pictures";
            string uploadMessage = "";

            if (file == null || file.ContentLength == 0)
                uploadMessage = "No file uploaded at " + DateTime.Now.ToString();
            else
            {
                uploadMessage = string.Format("<b>{0}</b> uploaded to the server at {1}", Path.GetFileName(file.FileName), DateTime.Now.ToString());
                pictureUrl = "/picture-uploads/" + Path.GetFileName(file.FileName);
            }

            return Content(
                new JavaScriptSerializer().Serialize(
                    new
                    {
                        fullname = fullname,
                        gender = gender,
                        color = color,
                        pictureUrl = pictureUrl
                    }
                )
            );
        }

        public ActionResult Index()
        {
            return View();
        }
    }
}
