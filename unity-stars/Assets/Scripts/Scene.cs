
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

using Random = UnityEngine.Random;

namespace benchmark
{
    public class Scene : MonoBehaviour
    {
        public GameObject starPrefab = null;
        public Text countLabel = null;

        private List<GameObject> stars = new List<GameObject>();
        private float screenWidth = 0;
        private float screenHeight = 0;

        /// <summary>
        /// Start is called on the frame when a script is enabled just before
        /// any of the Update methods is called the first time.
        /// </summary>
        void Start()
        {
            Application.targetFrameRate = 60;

            screenHeight = Camera.main.orthographicSize * 2.0f;
            screenWidth = screenHeight * Screen.width / Screen.height;

            AddStars(100);
        }

        /// <summary>
        /// Update is called every frame, if the MonoBehaviour is enabled.
        /// </summary>
        void Update()
        {
            if ((Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Began)
            || Input.GetMouseButtonDown(0))
            {
                AddStars(100);
            }

            int count = stars.Count;
            for (int i = 0; i < count; i++)
            {
                stars[i].transform.Rotate(Vector3.back);
            }
        }

        private void AddStars(int count)
        {
            for (int i = 0; i < count; i++)
            {
                GameObject star = Instantiate(starPrefab);
                star.transform.position = new Vector3(Random.Range(0, screenWidth) - screenWidth / 2, Random.Range(0, screenHeight) - screenHeight / 2, 0);
                star.transform.parent = this.transform;

                stars.Add(star);
            }

            countLabel.text = stars.Count.ToString() + " stars";
        }
    }


}

